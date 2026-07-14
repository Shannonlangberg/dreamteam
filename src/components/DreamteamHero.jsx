import dtGraphic from "../assets/graphics/dreamteam-graphic.png";
import "./DreamteamHero.css";

/**
 * The official Dreamteam Day promo graphic ("All In Dream Team" with
 * Ps Ashley, Saturday 18 July) — dropped in as-is, not redrawn or
 * recreated. This is real event marketing art, so it takes priority over
 * any generated placeholder.
 */
export default function DreamteamHero() {
  return (
    <div className="dt-hero">
      <img src={dtGraphic} alt="Dreamteam Day — Saturday 18 July, with Ps Ashley" className="dt-hero__img" />
    </div>
  );
}
