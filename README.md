# Dreamteam — Multiply or Die Book Redemption

Three static, self-contained pages for the "Multiply or Die" book redemption flow at Futures Church. No build step — each file embeds its own fonts, logo, and Supabase client via CDN script tags, so this deploys as-is.

- `index.html` — attendee signup form. Collects first name, last name, email; writes a row to Supabase and shows a QR code encoding that row's unique ID.
- `scanner.html` — leader-facing camera QR scanner. Scans a QR, looks up the redemption by ID, and marks it redeemed (idempotent — re-scans are flagged, not double-counted).
- `admin.html` — passcode-gated dashboard showing every signup, redemption status, and a CSV export.

## Backend

Supabase project `dreamteam-book-redemption` (ap-southeast-2). Table `redemptions` with RLS locked down — the anon key can only INSERT; all lookups/redemption/listing go through `SECURITY DEFINER` RPC functions (`redeem_book`, `get_redemption`, `list_redemptions`) so the public key can never dump the table directly.

## Deploy

Static site, no build command, publish directory is the repo root.
