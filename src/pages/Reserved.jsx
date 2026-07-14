import { useLocation, useNavigate } from "react-router-dom";
import Screen from "../components/Screen";

/**
 * Screen 3 — Reserved / confirmed.
 * Matched, pre-registered person → always gets a book. This is the
 * one-time redemption code/QR they show at the book table (v1 scope —
 * no email, that's v2).
 */
export default function Reserved() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.code) {
    navigate("/identify");
    return null;
  }

  return (
    <Screen tone="success" eyebrow="You're all set" title="Book reserved!" subtitle={`Nice to see you, ${state.person?.firstName}. Show this code at the book table.`}>
      <div className="result-card result-card--success">
        <div className="code-display">{state.code}</div>
      </div>
      <button className="btn btn-primary" onClick={() => navigate("/")}>
        Done
      </button>
    </Screen>
  );
}
