import raysOrange from "../assets/logos/raysOrange.png";
import raysPink from "../assets/logos/raysPink.png";
import raysPurple from "../assets/logos/raysPurple.png";
import futuresLogo from "../assets/logos/Futures1white.png";
import "./DreamteamHero.css";

/**
 * A Dreamteam Day event graphic built from approved brand assets only:
 * the ray/pathway pattern (explicitly approved for reuse) layered behind a
 * "Dreamteam" wordmark set in Rhymes Display, plus the small Futures Church
 * logo as the sub-brand. No redrawing of the official Futures logo — this
 * is a new event mark, same rules as any other campaign graphic in the
 * GENERIC DESIGNS folder.
 */
export default function DreamteamHero() {
  return (
    <div className="dt-hero">
      <img src={raysPurple} alt="" className="dt-hero__ray dt-hero__ray--1" aria-hidden="true" />
      <img src={raysOrange} alt="" className="dt-hero__ray dt-hero__ray--2" aria-hidden="true" />
      <img src={raysPink} alt="" className="dt-hero__ray dt-hero__ray--3" aria-hidden="true" />

      <div className="dt-hero__content">
        <img src={futuresLogo} alt="Futures Church" className="dt-hero__sublogo" />
        <div className="dt-hero__eyebrow">Copper Coast Campus</div>
        <h1 className="dt-hero__title">Dreamteam</h1>
        <div className="dt-hero__day">DAY</div>
      </div>
    </div>
  );
}
