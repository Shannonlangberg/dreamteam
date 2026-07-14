import { useLocation, useNavigate } from "react-router-dom";
import Screen from "../components/Screen";

/**
 * Buffer-full outcome of register-on-the-spot: no books free to give right
 * now, so the person gets a claim-at-the-end ticket instead. Still counted
 * in the ledger (status: waitlisted) so volunteers can work through the
 * list if books free up from no-shows.
 */
export default function ClaimAtEnd() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.ticket) {
    navigate("/");
    return null;
  }

  return (
    <Screen
      tone="warning"
      eyebrow="You're registered"
      title="Claim-at-the-end ticket"
      subtitle="We're all out of free books right now, but you're on the list — check back with a volunteer near the end of the day."
    >
      <div className="result-card result-card--warning">
        <div className="code-display">{state.ticket}</div>
      </div>
      <button className="btn btn-secondary" onClick={() => navigate("/")}>
        Done
      </button>
    </Screen>
  );
}
