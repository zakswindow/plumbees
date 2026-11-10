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

## Deploy to EC2 (PM2 and nginx, behind Cloudflare)
The server never builds. `scripts/deploy.sh` builds here, ships a release, installs production dependencies on the server (checked against the lockfile hashes), switches a `current` symlink, restarts only the `plumbees` PM2 process, health-checks it and rolls back if the check fails.

**One-off server setup (Ubuntu 26.04, alongside Heatingology)**
Plumbees is built to share a server with Heatingology's `scripts/server/setup.sh`. Run that script first. Plumbees then adds only its own pieces and never edits Heatingology's:

| | Heatingology | Plumbees |
|---|---|---|
| Unix user and PM2 daemon | `heatingology` | `plumbees` |
| App port (127.0.0.1 only) | 3000 | 3001 |
| nginx files | `heatingology*` | `plumbees*` (own rate-limit zones) |
| Certificate folder | `/etc/ssl/heatingology` | `/etc/ssl/plumbees` |
| Firewall, SSH, fail2ban, real-IP | set by its script | untouched, reused |

1. Create a Cloudflare Origin certificate for `plumbees.co.uk` and `*.plumbees.co.uk`.
2. Copy `scripts/server-setup.sh` and the `deploy/` files to the server and run `sudo bash server-setup.sh --cert origin.pem --key origin.key` (read it first). Without a certificate it makes a temporary self-signed one, so keep Cloudflare on Full until you re-run it with the real one.
3. No `.env` file on the server. Settings are SecureString parameters under `/plumbees/prod`: `SES_FROM`, `QUOTE_NOTIFY_TO`, `QUOTE_REPLY_TO`, `IDEALPOSTCODES_API_KEY`, `TRUST_PROXY` (1), and optionally `SITE_URL`, `AWS_REGION`. `deploy/start.mjs` reads them at start-up and refuses to start if a required one is missing. Use new keys, never copies from another server.
4. Give the instance role `ses:SendEmail` and `ssm:GetParametersByPath` on `/plumbees/prod` only (plus `kms:Decrypt` if you use your own KMS key), and verify the sending address in SES.
5. In Cloudflare: add the DNS records last, and set SSL/TLS mode to Full (strict).

**Each deploy**
```bash
DEPLOY_HOST=<admin-user>@<server-ip> DEPLOY_KEY=~/.ssh/<key> bash scripts/deploy.sh
```
`SITE_URL`, `SITE_PHONE` and `SITE_REVIEWS_URL` are baked in at build time (defaults are in the script). `bash scripts/deploy.sh --build-only` assembles the release without needing a server.

The Dockerfile and compose file are kept for local use but production runs on PM2.

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
