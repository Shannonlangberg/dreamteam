/**
 * mockBackend.js
 *
 * Stand-in for the Supabase layer described in the brief:
 *   - registrant sync table  (mirrors PCO Registrations, refreshed every ~1-2min)
 *   - redemption ledger      (source of truth for who has collected a book)
 *   - buffer logic           (books remaining vs reserved-but-uncollected)
 *
 * This lives entirely in memory (a JS module singleton) so the 6 screens can
 * be built and clicked through end-to-end before the real PCO schema is
 * confirmed. Every function here maps 1:1 to a future Supabase call
 * (select / insert / rpc) — swapping this module for a real
 * `src/data/supabaseBackend.js` should not require changing any screen.
 *
 * NOTE: no localStorage/sessionStorage — in-memory only, matches how the
 * real Supabase client + realtime subscriptions will behave (state lives
 * server-side, the client just reflects it).
 */

const TOTAL_BOOKS = 500;

// Seed a plausible registrant list. In prod this table is populated by the
// PCO sync job, keyed by PCO registration id, with a household/group key
// once we know the real dedup shape from the probe script.
let registrants = [
  { id: "r1", householdKey: "h1", firstName: "Sam", lastName: "Wallace", email: "sam.w@example.com", registered: true },
  { id: "r2", householdKey: "h1", firstName: "Priya", lastName: "Wallace", email: "sam.w@example.com", registered: true },
  { id: "r3", householdKey: "h2", firstName: "Jordan", lastName: "Lee", email: "jordan.lee@example.com", registered: true },
  { id: "r4", householdKey: "h3", firstName: "Ashleigh", lastName: "Brown", email: "ash.brown@example.com", registered: true },
  { id: "r5", householdKey: "h4", firstName: "Marcus", lastName: "Odei", email: "marcus.o@example.com", registered: true },
];

// Redemption ledger — Supabase source of truth in prod.
// status: 'reserved' (code issued, not yet shown at table) | 'collected'
let ledger = [];
let codeCounter = 1000;
let onSpotCounter = 1;

const listeners = new Set();
function notify() {
  listeners.forEach((fn) => fn());
}
export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function generateCode() {
  codeCounter += 1;
  return `DT-${codeCounter}`;
}

function householdAlreadyClaimed(householdKey) {
  return ledger.some(
    (entry) => entry.householdKey === householdKey && entry.status !== "cancelled"
  );
}

export function getStats() {
  const collected = ledger.filter((e) => e.status === "collected").length;
  const reservedUncollected = ledger.filter((e) => e.status === "reserved").length;
  const remaining = TOTAL_BOOKS - collected - reservedUncollected;
  return {
    totalBooks: TOTAL_BOOKS,
    collected,
    reservedUncollected,
    remaining,
    freeToGiveNow: Math.max(remaining, 0),
  };
}

export function getRecentActivity(limit = 8) {
  return ledger
    .slice()
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, limit);
}

/**
 * Look up a person by name/email fragment against the synced registrant list.
 * Mirrors what the real lookup screen will do against the Supabase registrant
 * sync table (never a live call to PCO).
 */
export function lookupRegistrant(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return registrants.filter((r) =>
    `${r.firstName} ${r.lastName} ${r.email}`.toLowerCase().includes(q)
  );
}

/**
 * Matched, pre-registered path: always gets a book (protect registered
 * people), subject to the one-book-per-household rule.
 */
export function redeemForRegistrant(registrantId) {
  const person = registrants.find((r) => r.id === registrantId);
  if (!person) {
    return { outcome: "error", message: "Registrant not found." };
  }

  if (householdAlreadyClaimed(person.householdKey)) {
    return { outcome: "family-claimed", person };
  }

  const code = generateCode();
  ledger.push({
    id: code,
    registrantId,
    householdKey: person.householdKey,
    name: `${person.firstName} ${person.lastName}`,
    status: "reserved",
    kind: "matched",
    timestamp: Date.now(),
  });
  notify();
  return { outcome: "reserved", code, person };
}

/**
 * Unmatched, on-the-spot path: register them, then book only if the live
 * buffer allows (remaining minus reserved-but-uncollected). Otherwise a
 * claim-at-the-end ticket. Fail open on household ambiguity — if we can't
 * confidently tell they're a dup, let them through.
 */
export function registerOnSpotAndClaim({ firstName, lastName, email }) {
  onSpotCounter += 1;
  const householdKey = `onspot-${onSpotCounter}`;
  const newRegistrant = {
    id: `os-${onSpotCounter}`,
    householdKey,
    firstName,
    lastName,
    email,
    registered: false,
  };
  registrants = [...registrants, newRegistrant];

  const stats = getStats();
  if (stats.freeToGiveNow > 0) {
    const code = generateCode();
    ledger.push({
      id: code,
      registrantId: newRegistrant.id,
      householdKey,
      name: `${firstName} ${lastName}`,
      status: "reserved",
      kind: "on-the-spot",
      timestamp: Date.now(),
    });
    notify();
    return { outcome: "reserved", code, person: newRegistrant };
  }

  const ticket = `WAIT-${onSpotCounter}`;
  ledger.push({
    id: ticket,
    registrantId: newRegistrant.id,
    householdKey,
    name: `${firstName} ${lastName}`,
    status: "waitlisted",
    kind: "claim-at-end",
    timestamp: Date.now(),
  });
  notify();
  return { outcome: "claim-at-end", ticket, person: newRegistrant };
}

/** Volunteer marks a reserved code as physically collected at the table. */
export function markCollected(code) {
  const entry = ledger.find((e) => e.id === code);
  if (entry) {
    entry.status = "collected";
    notify();
  }
  return entry;
}

export function _devSetBuffer(remaining) {
  // Dev helper only, to demo the "buffer full" claim-at-end path.
  const stats = getStats();
  const toFill = stats.remaining - remaining;
  for (let i = 0; i < toFill; i += 1) {
    codeCounter += 1;
    ledger.push({
      id: `DT-${codeCounter}`,
      registrantId: `filler-${i}`,
      householdKey: `filler-h-${i}`,
      name: "Buffer filler",
      status: "reserved",
      kind: "matched",
      timestamp: Date.now(),
    });
  }
  notify();
}
