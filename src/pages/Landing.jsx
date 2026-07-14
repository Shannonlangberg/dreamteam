import { useNavigate } from "react-router-dom";
import Screen from "../components/Screen";
import DreamteamHero from "../components/DreamteamHero";

/**
 * Screen 1 — QR landing.
 * What a person sees the instant they scan the QR code at a Dreamteam Day
 * volunteer station. Kept to one decision: start.
 */
export default function Landing() {
  const navigate = useNavigate();

  return (
    <Screen hero={<DreamteamHero />}>
      <div style={{ marginTop: 6 }}>
        <h1 className="display" style={{ fontSize: 26, textAlign: "center" }}>
          Grab your free book
        </h1>
        <p
          style={{
            color: "var(--color-text-muted)",
            textAlign: "center",
            margin: "8px 0 22px",
            fontSize: 15,
            lineHeight: 1.5,
          }}
        >
          We're giving every registered guest a free book today. Let's find
          your registration and get you a redemption code to show at the
          book table.
        </p>
        <button className="btn btn-primary" onClick={() => navigate("/identify")}>
          Get started
        </button>
        <p
          style={{
            fontSize: 13,
            color: "var(--color-text-muted)",
            marginTop: 16,
            textAlign: "center",
          }}
        >
          One book per household. Ask a volunteer if you need help.
        </p>
      </div>
    </Screen>
  );
}
