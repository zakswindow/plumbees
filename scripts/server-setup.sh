#!/usr/bin/env bash
# One-off setup for a FRESH Amazon Linux 2023 instance. Read it before you run it.
#   scp this file to the server, then: bash server-setup.sh
# It installs nginx, Node 22 and PM2, makes PM2 start on boot, and turns on automatic security updates.
# It does not install certificates or secrets. Those are added by hand (see the README).
set -euo pipefail

echo "==> System updates"
sudo dnf -y update

echo "==> Node 22, nginx, rsync"
sudo dnf -y install nodejs22 nodejs22-npm nginx rsync || sudo dnf -y install nodejs nginx rsync
node -v | grep -q '^v22\.' || { echo "Expected Node 22, got $(node -v). Install Node 22 and re-run."; exit 1; }

echo "==> PM2 (pinned) and boot start"
sudo npm install -g pm2@6.0.8 --ignore-scripts
sudo env PATH="$PATH:/usr/bin" pm2 startup systemd -u ec2-user --hp /home/ec2-user >/dev/null

echo "==> Folders"
mkdir -p /home/ec2-user/plumbees/releases
touch /home/ec2-user/plumbees/.env && chmod 600 /home/ec2-user/plumbees/.env
sudo mkdir -p /etc/nginx/ssl && sudo chmod 700 /etc/nginx/ssl

echo "==> Automatic security updates"
sudo dnf -y install dnf-automatic
sudo sed -i 's/^apply_updates.*/apply_updates = yes/' /etc/dnf/automatic.conf
sudo systemctl enable --now dnf-automatic.timer

echo "==> nginx on boot"
sudo systemctl enable nginx

echo "Done. Next: put the Cloudflare Origin certificate in /etc/nginx/ssl, fill in ~/plumbees/.env,"
echo "install deploy/nginx.conf as /etc/nginx/conf.d/plumbees.conf, run 'sudo nginx -t', then start nginx."
