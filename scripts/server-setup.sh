#!/usr/bin/env bash
# Adds Plumbees to an Ubuntu 26.04 server that was built with Heatingology's scripts/server/setup.sh.
# Safe to run before or after that script, and safe to run twice. Read it before you run it.
#
#   scp scripts/server-setup.sh deploy/nginx.conf deploy/nginx-proxy.conf deploy/ecosystem.config.js <admin>@<server>:
#   sudo bash server-setup.sh [--cert origin.pem --key origin.key]
#
# What it does NOT do, on purpose, so Heatingology is never disturbed:
#   - no firewall changes (Heatingology's UFW rules already limit 80/443 to Cloudflare)
#   - no SSH, fail2ban or kernel changes
#   - no "default_server" nginx block (Heatingology's catch-all already answers unknown hosts)
#   - no global nginx settings (Heatingology's 01-heatingology-global.conf covers them)
#   - no reload of nginx unless "nginx -t" passes, so a mistake here cannot take Heatingology down
# Separate by design: own unix user, own PM2 daemon, own port (3001), own certificate folder, own nginx file.
set -euo pipefail

APP_USER="plumbees"
APP_HOME="/home/${APP_USER}"
APP_ROOT="${APP_HOME}/plumbees"
NODE_MAJOR="22"
PM2_VERSION="5.4.3"            # the same version Heatingology installs, because pm2 is one global binary
TLS_DIR="/etc/ssl/plumbees"
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CERT=""; KEY=""

say () { printf '\n==> %s\n' "$*"; }
die () { printf 'ERROR: %s\n' "$*" >&2; exit 1; }

while [ $# -gt 0 ]; do
  case "$1" in
    --cert) CERT="${2:-}"; shift 2 ;;
    --key)  KEY="${2:-}";  shift 2 ;;
    *) die "Unknown option $1" ;;
  esac
done

[ "$(id -u)" = 0 ] || die "Run with sudo."
. /etc/os-release; [ "${ID:-}" = ubuntu ] || die "This script is for Ubuntu (found ${ID:-unknown})."
for f in nginx.conf nginx-proxy.conf ecosystem.config.js; do
  [ -f "$HERE/$f" ] || [ -f "$HERE/../deploy/$f" ] || die "Missing $f next to this script."
done
src () { [ -f "$HERE/$1" ] && echo "$HERE/$1" || echo "$HERE/../deploy/$1"; }

if [ -n "$CERT$KEY" ]; then
  [ -f "$CERT" ] && [ -f "$KEY" ] || die "Give both --cert and --key."
  openssl x509 -in "$CERT" -noout >/dev/null 2>&1 || die "The certificate is not a valid PEM file."
  openssl pkey -in "$KEY" -noout >/dev/null 2>&1 || die "The key is not a valid PEM file."
  [ "$(openssl x509 -in "$CERT" -noout -pubkey | openssl sha256)" = "$(openssl pkey -in "$KEY" -pubout | openssl sha256)" ] \
    || die "The certificate and key do not belong together."
fi

say "Packages (only what is missing)"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y --no-install-recommends ca-certificates curl gnupg rsync openssl nginx

if ! command -v node >/dev/null 2>&1 || [ "$(node -p 'process.versions.node.split(".")[0]')" != "$NODE_MAJOR" ]; then
  say "Node.js ${NODE_MAJOR} (same source Heatingology uses)"
  install -d -m 0755 /etc/apt/keyrings
  curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor --yes -o /etc/apt/keyrings/nodesource.gpg
  chmod 0644 /etc/apt/keyrings/nodesource.gpg
  echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_${NODE_MAJOR}.x nodistro main" \
    > /etc/apt/sources.list.d/nodesource.list
  apt-get update -y && apt-get install -y nodejs
fi

if ! command -v pm2 >/dev/null 2>&1; then
  say "pm2 ${PM2_VERSION}"
  npm install -g --no-fund --no-audit --ignore-scripts "pm2@${PM2_VERSION}"
else
  echo "pm2 $(pm2 --version 2>/dev/null | tail -1) already installed. Leaving it alone, because Heatingology uses the same binary."
fi

say "The ${APP_USER} user (no password, no SSH key, nobody can log in as it)"
id "$APP_USER" >/dev/null 2>&1 || adduser --disabled-password --gecos "Plumbees website" "$APP_USER"
passwd -l "$APP_USER" >/dev/null 2>&1 || true
chmod 0750 "$APP_HOME"
install -d -o "$APP_USER" -g "$APP_USER" -m 0750 "$APP_ROOT" "$APP_ROOT/releases"
# No .env file: settings are read from Parameter Store at start-up (deploy/start.mjs).
rm -f "$APP_ROOT/.env"

say "Real visitor address"
[ -f /etc/nginx/conf.d/00-cloudflare-realip.conf ] \
  || die "Heatingology's /etc/nginx/conf.d/00-cloudflare-realip.conf is missing. Run Heatingology's setup.sh first, so visitor addresses (and rate limits) are real."

say "TLS certificate for plumbees.co.uk"
install -d -m 0750 -o root -g root "$TLS_DIR"
if [ -n "$CERT" ]; then
  install -m 0644 -o root -g root "$CERT" "$TLS_DIR/origin.pem"
  install -m 0600 -o root -g root "$KEY"  "$TLS_DIR/origin.key"
  echo "Cloudflare Origin certificate installed."
elif [ ! -f "$TLS_DIR/origin.pem" ]; then
  echo "No certificate given. Making a temporary self-signed one so nginx stays valid."
  echo "Keep Cloudflare on 'Full' (not 'Full (strict)') until you re-run with --cert and --key."
  openssl req -x509 -nodes -newkey rsa:3072 -days 365 -subj "/CN=www.plumbees.co.uk" \
    -keyout "$TLS_DIR/origin.key" -out "$TLS_DIR/origin.pem" >/dev/null 2>&1
  chmod 0600 "$TLS_DIR/origin.key"
fi

say "nginx files (all named plumbees*, nothing of Heatingology's is edited)"
install -d -m 0755 /etc/nginx/snippets
cat > /etc/nginx/snippets/plumbees-tls.conf <<TLS
ssl_certificate ${TLS_DIR}/origin.pem;
ssl_certificate_key ${TLS_DIR}/origin.key;
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305;
ssl_prefer_server_ciphers off;
ssl_session_cache shared:SSL:10m;
ssl_session_timeout 1d;
ssl_session_tickets off;
TLS
install -m 0644 "$(src nginx-proxy.conf)" /etc/nginx/snippets/plumbees-proxy.conf
# Authenticated Origin Pulls is left off here. Switch it on later once Cloudflare has it enabled for this zone.
sed 's|#PLUMBEES_AOP#|# Authenticated Origin Pulls off|' "$(src nginx.conf)" > /etc/nginx/sites-available/plumbees
chmod 0644 /etc/nginx/sites-available/plumbees

# Test first with the new site enabled. If it fails, take it out again so Heatingology keeps working.
ln -sf /etc/nginx/sites-available/plumbees /etc/nginx/sites-enabled/plumbees
if ! nginx -t; then
  rm -f /etc/nginx/sites-enabled/plumbees
  die "nginx rejected the Plumbees config. It has been disabled again and nothing was reloaded."
fi
systemctl enable nginx >/dev/null 2>&1 || true
if systemctl is-active --quiet nginx; then systemctl reload nginx; else systemctl start nginx; fi

say "pm2 on boot for ${APP_USER} (its own daemon, separate from Heatingology's)"
install -o "$APP_USER" -g "$APP_USER" -m 0644 "$(src ecosystem.config.js)" "$APP_ROOT/ecosystem.config.js"
env PATH="$PATH:/usr/bin" pm2 startup systemd -u "$APP_USER" --hp "$APP_HOME" >/dev/null
systemctl enable "pm2-${APP_USER}" >/dev/null 2>&1 || true

cat <<DONE

Done. Checks:
  sudo ss -tlnp | grep -E ':(3000|3001)'     (3000 is Heatingology, 3001 will be Plumbees, both on 127.0.0.1)
  sudo ufw status | head                      (should be unchanged)

Next:
  1. Check the instance role may read /plumbees/prod (ssm:GetParametersByPath, plus kms:Decrypt if you use your own key)
  2. From your laptop: DEPLOY_HOST=<admin>@<server-ip> DEPLOY_KEY=<key> bash scripts/deploy.sh
  3. Cloudflare: add the A records for plumbees.co.uk and www, last
DONE
