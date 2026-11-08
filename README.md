# Plumbees website

Next.js 16 (App Router, TypeScript) site for Plumbees, a trading name of Heatingology Limited (England and Wales No. 13808029).

## Run locally
```bash
cp .env.example .env     # fill in the values
npm ci --ignore-scripts
npm run dev
```

## Checks
`npm run lint`, `npm run typecheck`, `npm run build`, `npm run audit` (fails on high or critical), `node scripts/check-pinned.mjs`.

## Deploy to EC2
1. Install Docker and nginx. Copy `deploy/nginx.conf` to `/etc/nginx/conf.d/`, add the certificate, reload.
2. Create `.env` on the server from `.env.example`. `SITE_URL`, `SITE_PHONE` and `SITE_EMAIL` are baked in at build time.
3. `docker compose up -d --build`. The container listens on 127.0.0.1:3000 only.
4. Attach an IAM role to the instance allowing `ses:SendEmail` from the verified sender identity. No keys are stored.
5. Verify the SES domain (DKIM, SPF, DMARC) and request production access to leave the SES sandbox.

## Security
- Dependencies are pinned to exact versions. `package-lock.json` holds sha512 integrity hashes and `npm ci` verifies them. Install scripts are disabled.
- Docker base image is pinned by digest. GitHub Actions are pinned by commit SHA. Dependabot opens weekly updates.
- Strict security headers (CSP, HSTS, frame denial, nosniff, referrer and permissions policy) in `next.config.ts`.
- Quote endpoint: same-origin check, JSON only, size cap, Zod validation, honeypot, timing check, per-IP rate limit (app and nginx), control characters stripped, all email output HTML-escaped.
- Container runs as non-root, read-only filesystem, all capabilities dropped.
- CSP allows inline scripts because Next.js injects them. Moving to nonces would make every page dynamic, so it is a deliberate trade-off for a static brochure site with no third-party scripts.

## Content
Services live in `src/lib/services.ts`, areas in `src/lib/areas.ts`. Pages, sitemap and structured data update from those files.

## Quote journey
- `/get-a-quote` asks what the job is first. `/quote/<service-slug>` starts at that service (linked from each service page, not indexed).
- Questions live in `src/lib/quote-flow.ts`. The server re-walks the same definitions, so it only accepts answers that exist and lie on the path the customer took.
- Address lookup uses Ideal Postcodes through `/api/postcode/search` and `/api/postcode/address`. Set `IDEALPOSTCODES_API_KEY`. Without it, customers can still type their address manually.
- Progress is kept in memory only, so the site still stores nothing in the browser (see the cookie policy).
