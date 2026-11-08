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

**One-off server setup (fresh Amazon Linux 2023 only)**
1. Create the instance from the standard Amazon Linux image with a new key pair, SSH from your own IP only, ports 80 and 443 open, and an IAM role limited to `ses:SendEmail`.
2. Run `scripts/server-setup.sh` on it (read it first). It installs Node 22, nginx and PM2 and turns on automatic security updates.
3. Create a Cloudflare Origin certificate for `plumbees.co.uk` and `*.plumbees.co.uk`. Save it as `/etc/nginx/ssl/plumbees.co.uk.pem` and `/etc/nginx/ssl/plumbees.key` (key `chmod 600`, owned by root).
4. Copy `deploy/server.env.example` to `/home/ec2-user/plumbees/.env`, fill it in, `chmod 600`. Use new keys, never copies from another server.
5. Copy `deploy/nginx.conf` to `/etc/nginx/conf.d/plumbees.conf`, run `sudo nginx -t`, then `sudo systemctl start nginx`.
6. In Cloudflare: add the DNS records pointing at the server, set SSL/TLS mode to Full (strict), and verify the sending address in SES.

**Each deploy**
```bash
DEPLOY_HOST=ec2-user@<server-ip> DEPLOY_KEY=~/.ssh/<key>.pem bash scripts/deploy.sh
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
