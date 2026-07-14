import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Screen from "../components/Screen";
import { registerOnSpotAndClaim } from "../data/mockBackend";

/**
 * Screen 5 — Register on the spot.
 * Unmatched person: register them, then book only if the live buffer
 * allows (remaining minus reserved-but-uncollected); otherwise a
 * claim-at-the-end ticket. No-show slack from pre-registered people is
 * the generosity budget this draws from.
 */
export default function RegisterOnSpot() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const outcome = registerOnSpotAndClaim(form);
    if (outcome.outcome === "reserved") {
      navigate("/reserved", { state: outcome });
    } else {
      navigate("/claim-at-end", { state: outcome });
    }
  }

  return (
    <Screen
      eyebrow="Not in our list?"
      title="Register on the spot"
      subtitle="Takes 10 seconds — we'll check if we can give you a book right now."
    >
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="firstName">First name</label>
          <input id="firstName" required value={form.firstName} onChange={update("firstName")} />
        </div>
        <div className="field">
          <label htmlFor="lastName">Last name</label>
          <input id="lastName" required value={form.lastName} onChange={update("lastName")} />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" required value={form.email} onChange={update("email")} />
        </div>
        <button className="btn btn-primary" type="submit">
          Register &amp; check availability
        </button>
      </form>
    </Screen>
  );
}
