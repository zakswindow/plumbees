#!/usr/bin/env bash
# Build here, ship a release to the server, switch over. The server never builds (it is too small to).
#
#   DEPLOY_HOST=<admin-user>@<server-ip> DEPLOY_KEY=~/.ssh/plumbees.pem bash scripts/deploy.sh
#   bash scripts/deploy.sh --build-only      (assemble ./.release and stop, no server needed)
#
# Only the "plumbees" PM2 process (under the "plumbees" user, port 3001) is touched.
# Heatingology runs under its own user and its own PM2, so it is never restarted from here.
set -euo pipefail

cd "$(dirname "$0")/.."
BUILD_ONLY=0; [ "${1:-}" = "--build-only" ] && BUILD_ONLY=1

APP_USER="plumbees"
REMOTE_ROOT="/home/$APP_USER/plumbees"
export SITE_URL="${SITE_URL:-https://www.plumbees.co.uk}"
export SITE_PHONE="${SITE_PHONE:-0333 577 0017}"
export SITE_REVIEWS_URL="${SITE_REVIEWS_URL:-https://g.page/r/Ccq9b-f29nxqEBM/review}"
export NEXT_TELEMETRY_DISABLED=1

echo "==> Checks"
node scripts/check-pinned.mjs
npm audit --audit-level=high
npm run lint
npm run typecheck

echo "==> Building for $SITE_URL"
npm run build

echo "==> Assembling release"
rm -rf .release && mkdir -p .release
cp -R .next/standalone/. .release/
rm -rf .release/node_modules                   # reinstalled on the server so native parts match its CPU
mkdir -p .release/.next && cp -R .next/static .release/.next/static
cp -R public .release/public
cp package.json package-lock.json .npmrc .release/
cp deploy/ecosystem.config.js deploy/start.mjs .release/
echo "Release ready in .release ($(du -sh .release | cut -f1))"
[ "$BUILD_ONLY" = 1 ] && exit 0

: "${DEPLOY_HOST:?Set DEPLOY_HOST, for example ubuntu@203.0.113.10}"
SSH_OPTS=(-o StrictHostKeyChecking=yes)
[ -n "${DEPLOY_KEY:-}" ] && SSH_OPTS+=(-i "$DEPLOY_KEY")
STAMP="$(date +%Y%m%d%H%M%S)"
REL="$REMOTE_ROOT/releases/$STAMP"

echo "==> Uploading to $DEPLOY_HOST:$REL"
# Log in as your admin user, then act as the "plumbees" user (nobody can log in as it directly).
AS_APP="sudo -n -u $APP_USER -H"
ssh "${SSH_OPTS[@]}" "$DEPLOY_HOST" "$AS_APP mkdir -p '$REL'"
rsync -az --delete --rsync-path="$AS_APP rsync" -e "ssh ${SSH_OPTS[*]}" .release/ "$DEPLOY_HOST:$REL/"

echo "==> Installing production dependencies (verified against the lockfile hashes)"
ssh "${SSH_OPTS[@]}" "$DEPLOY_HOST" "$AS_APP bash -c \"cd '$REL' && npm ci --omit=dev --ignore-scripts\""

echo "==> Switching to the new release"
ssh "${SSH_OPTS[@]}" "$DEPLOY_HOST" "$AS_APP bash -s" <<REMOTE
set -euo pipefail
cd '$REMOTE_ROOT'
PREV="\$(readlink -f current 2>/dev/null || true)"
ln -sfn '$REL' current
cp '$REL/ecosystem.config.js' ecosystem.config.js
if pm2 describe plumbees >/dev/null 2>&1; then pm2 restart plumbees --update-env; else pm2 start ecosystem.config.js; fi
sleep 4
if curl -fsS -o /dev/null http://127.0.0.1:3001/robots.txt; then
  echo "Healthy."
  pm2 save >/dev/null
  ls -1dt releases/* | tail -n +4 | xargs -r rm -rf   # keep the three newest releases
else
  echo "Health check failed. Rolling back."
  [ -n "\$PREV" ] && ln -sfn "\$PREV" current && pm2 restart plumbees --update-env
  exit 1
fi
REMOTE
echo "==> Deployed $STAMP"
