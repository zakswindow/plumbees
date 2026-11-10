// PM2 process for Plumbees. Runs under its own unix user ("plumbees") with its own PM2 daemon,
// so it can never touch the heatingology process. Port 3001: heatingology owns 3000.
const root = "/home/plumbees/plumbees";

module.exports = {
  apps: [
    {
      name: "plumbees",
      cwd: `${root}/current`,
      script: "start.mjs", // reads settings from Parameter Store, then starts server.js
      env: {
        NODE_ENV: "production",
        PORT: 3001,
        HOSTNAME: "127.0.0.1", // loopback only; nginx is the way in
        SSM_PARAMETER_PREFIX: "/plumbees/prod",
        SSM_REGION: "eu-west-2",
      },
      instances: 1,
      exec_mode: "fork",
      watch: false,
      max_memory_restart: "512M",
      kill_timeout: 5000,
    },
  ],
};
