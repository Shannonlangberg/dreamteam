import { useNavigate } from "react-router-dom";
import Screen from "../components/Screen";

/**
 * Screen 1 — QR landing.
 * What a person sees the instant they scan the QR code at a Dreamteam Day
 * volunteer station. Kept to one decision: start.
 */
export default function Landing() {
  const navigate = useNavigate();

  return (
    <Screen
      eyebrow="Dreamteam Day · Copper Coast"
      title="Grab your free book"
      subtitle="We're giving every registered guest a free book today. Let's find your registration and get you a redemption code to show at the book table."
    >
      <button className="btn btn-primary" onClick={() => navigate("/identify")}>
        Get started
      </button>
      <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginTop: 16, textAlign: "center" }}>
        One book per household. Ask a volunteer if you need help.
      </p>
    </Screen>
  );
}
