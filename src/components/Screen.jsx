import logo from "../assets/logos/Futures2.png";
import "./Screen.css";

/**
 * Shared page shell for every screen in the redemption flow.
 * Keeps a fixed drop-in slot for the official logo (never redrawn) and the
 * approved ray/pathway pattern as a background accent.
 * Pass `hero` to swap the small top logo for a bigger custom graphic
 * (used on the landing screen).
 */
export default function Screen({ eyebrow, title, subtitle, children, tone = "default", hero = null }) {
  return (
    <div className={`screen screen--${tone}`}>
      <div className="screen__rays" aria-hidden="true" />
      {hero ? (
        <header className="screen__header screen__header--hero">{hero}</header>
      ) : (
        <header className="screen__header">
          <img src={logo} alt="Futures Church" className="screen__logo" />
        </header>
      )}
      <main className="screen__card">
        {eyebrow && <div className="screen__eyebrow">{eyebrow}</div>}
        {title && <h1 className="display screen__title">{title}</h1>}
        {subtitle && <p className="screen__subtitle">{subtitle}</p>}
        <div className="screen__content">{children}</div>
      </main>
      <footer className="screen__footer">
        Dreamteam Day · Copper Coast Campus
      </footer>
    </div>
  );
}
