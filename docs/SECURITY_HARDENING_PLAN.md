# Security Hardening Plan

This document tracks the remaining security work across the backend, dashboard, and public website. Work is ordered by trust boundary and operational risk. Do not enforce CSP or run active exploit tests against production until staging validation is complete.

## Progress Summary

Already implemented:

- Backend Stripe webhook checks for complete/paid sessions, USD currency, expected pledge amount, and matching sponsorship, sponsor, and child metadata.
- Backend webhook updates for sponsorship, child, and sponsor records run in one MongoDB transaction.
- Admin refresh tokens carry a per-token ID stored in the admin session; refresh atomically rotates that ID and rejects stale replays. Existing sessions without token IDs can rotate once.
- Admin refresh tokens now carry a per-token ID stored in the admin session; refresh performs an atomic compare-and-swap to rotate that ID, and stale token replay is rejected. Existing legacy sessions without token IDs can rotate once.
- Blog update payloads are allow-listed to editorial fields; engagement arrays, feature state, publication timestamps, and database-managed fields are not writable through the editor endpoint.
- Staff create/update routes validate IDs and field values; the controller accepts only staff editor fields and drops database-managed or unrelated keys.
- The staff model's duplicate `type` declaration was removed so the `staff`/`volunteer` enum is enforced.
- Blog create/update requests validate field types, lengths, status values, image URL shapes, and Mongo IDs server-side.
- Content API section/status filters are validated as bounded scalar query parameters; content create/update validates slug IDs, title/section lengths, body size, and status values.
- Staff create/update routes validate IDs and field values; the controller accepts only staff editor fields and drops database-managed or unrelated keys.
- Sponsor profile updates validate sponsor IDs and profile/donation/image field shapes; donation changes are restricted to amount, period, expected funds date, and reminder preference.
- Manual payment recording validates positive bounded amounts, supported methods, references, and notes; payment append, status change, and total increment are applied in a single atomic document update, and public pledges remain on their dedicated confirmation workflow.
- Express proxy trust is disabled by default and configured through bounded `TRUST_PROXY_HOPS` (integer 0–10) so rate-limit client IPs are trusted only when deployment explicitly specifies the proxy depth.
- Allowed origins must be exact HTTP(S) origins with no paths or wildcard, and production origins must use HTTPS.
- Admin passwords require at least 12 characters for registration, update, and reset.
- Child-profile create/update accept an allow-list and cannot set sponsorship assignment/status or database-managed fields.
- Public sponsor image references are checked against the configured Cloudinary account and the URL asset ID must match the submitted public ID.
- Public blog/event interaction routes validate target IDs and UUIDv4 interaction identifiers.
- Public blog/event interaction writes are limited to 30 requests per IP per 15 minutes to curb write amplification from regenerated client identifiers.
- Contact/volunteer and newsletter routes have endpoint-specific rate limits and bounded email/name fields.
- Dashboard cache/token state is cleared on login/logout/session restoration failure. A rejected refresh token clears auth state and cached data so the existing route guard redirects to login.
- Both Next.js apps have baseline security headers. HSTS is added only in production.
- Both apps emit a `Content-Security-Policy-Report-Only` header. Both production builds currently pass with TypeScript validation enabled.

## Phase 1: Complete Backend Hardening

1. Complete a route/controller audit for every API family. Verify authentication, role/permission checks, object-level authorization, and explicit writable-field allow-lists for all admin mutations.
2. Review remaining public and admin inputs for schema validation, length/type/range constraints, unexpected keys, date validation, and pagination limits.
3. Review all image/file-reference paths beyond public sponsor photos. Confirm who can submit image URLs/public IDs and ensure destructive Cloudinary operations cannot be directed at unrelated assets.
4. Add replica-set integration tests for Mongo transactions and Stripe webhook retries. Verify concurrent deliveries cannot double-count, transaction retries are idempotent, and database failures roll back related updates.
5. Review production origin/secrets configuration, proxy/TLS assumptions, safe error responses, and sensitive-data redaction in logs.

## Phase 2: Complete Dashboard Hardening

1. Review the deployed `Content-Security-Policy-Report-Only` violations and confirm actual production API, Cloudinary, image, and script origins.
2. Tighten the CSP based on observed legitimate use. Prefer nonces or hashes for inline scripts/styles where feasible; remove `'unsafe-inline'` only after the app is compatible.
3. After staging validation, change from Report-Only to enforced CSP and verify that login, session refresh, API calls, uploads, and dashboard workflows still work.
4. Confirm all read/write authorization is enforced by backend routes. Test direct API calls without UI guards, wrong-role requests, altered IDs, session expiry, logout, and account switching.
5. Minimize donor PII in API responses and exports, clear sensitive cache on auth changes, and verify deployed cookie attributes and API origin are correct.

## Phase 3: Complete Public Website Hardening

1. Review deployed CSP Report-Only reports, focusing on Next.js runtime scripts/styles, Google Analytics, Vercel Analytics, Google Maps, Cloudinary uploads, the configured API, and third-party image hosts.
2. Replace broad or obsolete external image hosts with organization-controlled assets when practical. Keep only required external origins in the final CSP.
3. Tighten the website CSP; use nonces or hashes for inline scripts/styles where feasible. Validate forms, analytics, maps, uploads, and checkout in staging before enforcing.
4. Enforce CSP only after staging reports show that required flows are covered. Verify `frame-ancestors`, `object-src`, `base-uri`, `form-action`, HSTS, and other security headers in actual response headers.
5. Consider short-lived signed Cloudinary uploads if credentials and current upload workflows permit. Keep all browser-side file checks as usability checks only; backend verification remains authoritative.
6. Continue reviewing public forms for abuse, input bounds, safe display of user-authored content, and accurate payment-state messaging. Do not treat checkout returns or client callbacks as proof of payment.

## Phase 4: Staging and Production Release Gate

1. Run the backend test suite and both frontend lint/build checks. Confirm no TypeScript errors are suppressed.
2. In staging, test unauthenticated and wrong-role API calls, direct requests bypassing UI guards, session expiry/refresh/logout, CSRF/origin behavior, oversized or spoofed uploads, and contact/newsletter/sponsorship rate limits.
3. Test forged, unpaid, duplicate, wrong-currency, wrong-amount, and mismatched Stripe events. Confirm invalid events do not change records or totals and retries do not double-count.
4. Inspect real response headers and cookies from deployed HTTPS origins. Review CSP reports and then verify the enforced policy without breaking public or dashboard flows.
5. Run dependency and secret scans; verify production-only credentials, least-privilege database/storage accounts, backups, restore procedures, and incident-response contacts.
6. Release only after critical authorization and payment-integrity checks pass and staging results are reviewed.

## Known Constraints and Open Verification

- Stripe Payment Link payments remain staff-verified unless the client provides Stripe API/webhook access. A browser redirect, client reference, or donor-submitted transaction ID is not proof of payment.
- The Mongo transaction changes need a replica-set integration test; the current unit suite does not prove live transaction retry behavior.
- Admin refresh-token rotation should also receive replica-set/integration coverage for concurrent refresh and replay rejection; unit tests alone cannot prove database compare-and-swap behavior.
- Production deployment must set `TRUST_PROXY_HOPS` to the actual trusted reverse-proxy hop count. Do not set it to a broad trust value; if unset, Express ignores forwarded addresses and IP-based limits may group requests behind the proxy.
- CSP is report-only pending review of deployed browser reports. Current public pages use inline Next.js scripts/styles and a set of external image hosts.
- No production/staging integration test, deployed header inspection, dependency scan, secret scan, or backup-restore exercise has been completed as part of this implementation work.
- The public Stripe Checkout-session creation endpoint has its own limit of eight attempts per IP per 15 minutes; this is separate from the public pledge limiter.
- The dashboard and website CSP Report-Only directives were tightened to explicit observed resource origins and each configured API origin. Production builds and configuration assertions pass, but deployed violation reports remain to be reviewed before CSP enforcement.
- The current backend test suite passes 25 tests, including manual payment input, staff/sponsor allow-list, proxy-hop, and origin-validation tests. Blog allow-list tests cover rejecting forged engagement/publication fields and preserving an existing image on text-only updates. Refresh rotation passes the suite and syntax diagnostics, but no DB-backed replay/concurrency test exists yet.
- Backend suite remains green at 14 tests after content query/write validation; changed content files pass syntax and editor diagnostics.
- Public Stripe Checkout-session creation is limited to eight attempts per IP per 15 minutes; contact/newsletter endpoints also have endpoint-specific limits.
