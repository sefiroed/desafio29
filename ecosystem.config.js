module.exports = {
  apps: [
    {
      name: 'application-fork',
      script: './build/src/index.js',
      watch: true,
      autorestart: true,
      args: '--mode fork --run pm2',
    },
    {
      name: 'application-cluster',
      script: './build/src/index.js',
      watch: true,
      autorestart: true,
      instances: -1,
      args: '--mode cluster --run pm2',
    },
  ],
};
