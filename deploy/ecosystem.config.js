// PM2 process for Plumbees. Lives on the server at /home/ec2-user/plumbees/ecosystem.config.js
const root = "/home/ec2-user/plumbees";

module.exports = {
  apps: [
    {
      name: "plumbees",
      cwd: `${root}/current`,
      script: "server.js",
      // Secrets live only in this file on the server, never in the repo or the release.
      node_args: `--env-file=${root}/.env`,
      env: { NODE_ENV: "production", PORT: 3000, HOSTNAME: "127.0.0.1" }, // loopback only, nginx faces the internet
      instances: 1,
      exec_mode: "fork",
      watch: false,
      max_memory_restart: "512M",
      kill_timeout: 5000,
    },
  ],
};
