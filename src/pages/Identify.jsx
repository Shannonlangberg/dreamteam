import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Screen from "../components/Screen";
import { lookupRegistrant, redeemForRegistrant } from "../data/mockBackend";

/**
 * Screen 2 — Identify.
 * Person types name/email; we search the Supabase registrant sync table
 * (mocked here). This is a volunteer-assisted lookup on a shared tablet,
 * not self-serve on 500 personal phones — matches the throughput call in
 * the brief.
 */
export default function Identify() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);

  function handleSearch(e) {
    e.preventDefault();
    setResults(lookupRegistrant(query));
  }

  function handleSelect(registrantId) {
    const outcome = redeemForRegistrant(registrantId);
    if (outcome.outcome === "reserved") {
      navigate("/reserved", { state: outcome });
    } else if (outcome.outcome === "family-claimed") {
      navigate("/family-claimed", { state: outcome });
    }
  }

  return (
    <Screen
      eyebrow="Step 1 of 2"
      title="Find your registration"
      subtitle="Search by name or the email you registered with."
    >
      <form onSubmit={handleSearch}>
        <div className="field">
          <label htmlFor="query">Name or email</label>
          <input
            id="query"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Sam Wallace"
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </form>

      {results !== null && (
        <div style={{ marginTop: 20 }}>
          {results.length === 0 ? (
            <div className="result-card result-card--warning">
              <strong>No match found.</strong>
              <p style={{ margin: "6px 0 0" }}>
                Double-check the spelling, or register on the spot below.
              </p>
            </div>
          ) : (
            <div className="match-list">
              {results.map((r) => (
                <button key={r.id} className="match-item" onClick={() => handleSelect(r.id)}>
                  <span>
                    <div className="match-item__name">
                      {r.firstName} {r.lastName}
                    </div>
                    <div className="match-item__meta">{r.email}</div>
                  </span>
                  <span>→</span>
                </button>
              ))}
            </div>
          )}
          <button className="link-btn" onClick={() => navigate("/register")}>
            Not listed? Register on the spot
          </button>
        </div>
      )}
    </Screen>
  );
}
