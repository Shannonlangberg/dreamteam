import { useLocation, useNavigate } from "react-router-dom";
import Screen from "../components/Screen";

/**
 * Screen 4 — Family already claimed.
 * One book per household. Dedup key comes from whatever the PCO
 * Registrations data shape actually gives us (shared signup grouping or
 * shared email) — see the probe-script findings. Fails OPEN elsewhere in
 * the flow; this screen only appears when we're confident it's a dup.
 */
export default function FamilyClaimed() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <Screen
      tone="warning"
      eyebrow="Already collected"
      title="Your household already has a book"
      subtitle={
        state?.person
          ? `Looks like someone in ${state.person.lastName}'s household already picked one up today.`
          : "Looks like someone in your household already picked one up today."
      }
    >
      <div className="result-card result-card--warning">
        <p style={{ margin: 0 }}>
          If this doesn't look right, please flag it with a volunteer — we'd
          rather double-check than turn someone away who's owed a book.
        </p>
      </div>
      <button className="btn btn-secondary" onClick={() => navigate("/")}>
        Back to start
      </button>
    </Screen>
  );
}
