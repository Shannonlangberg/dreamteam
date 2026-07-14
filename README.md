# Dreamteam Book Redemption — v1 scaffold

React + Vite front end for the Copper Coast Dreamteam Day book redemption flow.

## Screens (all built, wired to an in-memory mock backend for now)
- `/` — QR landing
- `/identify` — search the registrant list
- `/reserved` — matched confirmation + one-time code
- `/family-claimed` — one-book-per-household block
- `/register` — register-on-the-spot
- `/claim-at-end` — buffer-full fallback ticket
- `/volunteer` — live book-table view (free-to-give-now, collected, recent activity)

## Try it
```
npm install
npm run dev
```

## Data layer
`src/data/mockBackend.js` is a stand-in for Supabase — every function maps 1:1
to a future Supabase call (select/insert/rpc). Swapping it for a real
`src/data/supabaseBackend.js` shouldn't require touching any screen.

## Still to do (blocked on the PCO probe script output)
- Confirm the real registrant/household data shape from Planning Center
  Registrations v2 (signup 3696619) — run `scripts/pco-registrations-probe.mjs`
  and paste back the redacted JSON schema.
- Design + apply the real Supabase schema (registrant sync table, redemption
  ledger, buffer logic) once the PCO shape is confirmed.
- Wire this front end to Supabase (client + realtime subscription for the
  volunteer view) in place of mockBackend.js.
- Drop in the official logo EPS/PNG in the exact final form if different from
  what's in `src/assets/logos/` (currently using Futures2.png).
- Printed/Sheet manual fallback list — process doc, not code.
