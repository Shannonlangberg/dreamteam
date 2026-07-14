import { useEffect, useState } from "react";
import Screen from "../components/Screen";
import { getStats, getRecentActivity, subscribe, markCollected } from "../data/mockBackend";

/**
 * Screen 6 — Volunteer live view.
 * Lives on the tablet(s) at the book table. Reads local Supabase state
 * (mocked here) so it never stalls on a live PCO call or venue wifi.
 * Shows "Free to give right now: N" — the number volunteers actually act
 * on — plus a running collected list and a manual-fallback reminder.
 */
export default function Volunteer() {
  const [stats, setStats] = useState(getStats());
  const [activity, setActivity] = useState(getRecentActivity());
  const [codeInput, setCodeInput] = useState("");

  useEffect(() => {
    return subscribe(() => {
      setStats(getStats());
      setActivity(getRecentActivity());
    });
  }, []);

  function handleCollect(e) {
    e.preventDefault();
    if (codeInput.trim()) {
      markCollected(codeInput.trim());
      setCodeInput("");
    }
  }

  return (
    <Screen
      eyebrow="Volunteer station"
      title="Book table"
      subtitle="Mark a code as collected once the book is physically handed over."
    >
      <div className="stat-grid">
        <div className="stat-tile">
          <div className="stat-tile__value">{stats.freeToGiveNow}</div>
          <div className="stat-tile__label">Free to give now</div>
        </div>
        <div className="stat-tile">
          <div className="stat-tile__value">{stats.collected}</div>
          <div className="stat-tile__label">Collected</div>
        </div>
        <div className="stat-tile">
          <div className="stat-tile__value">{stats.reservedUncollected}</div>
          <div className="stat-tile__label">Reserved, not yet collected</div>
        </div>
      </div>

      <form onSubmit={handleCollect} style={{ marginBottom: 18 }}>
        <div className="field">
          <label htmlFor="code">Mark code as collected</label>
          <input
            id="code"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            placeholder="e.g. DT-1001"
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Mark collected
        </button>
      </form>

      <h3 style={{ fontSize: 16, marginBottom: 8 }}>Recent activity</h3>
      <div>
        {activity.length === 0 && (
          <p style={{ color: "var(--color-text-muted)", fontSize: 14 }}>Nothing yet.</p>
        )}
        {activity.map((a) => (
          <div className="activity-row" key={a.id}>
            <span>
              {a.name} <span style={{ color: "var(--color-text-muted)" }}>({a.id})</span>
            </span>
            <span style={{ textTransform: "capitalize" }}>{a.status}</span>
          </div>
        ))}
      </div>

      <div className="result-card result-card--warning" style={{ marginTop: 20 }}>
        <strong>Manual fallback stays live.</strong>
        <p style={{ margin: "6px 0 0" }}>
          Keep the printed registrant list at the table. If the app wobbles,
          keep ticking names off by hand — books keep moving no matter what.
        </p>
      </div>
    </Screen>
  );
}
