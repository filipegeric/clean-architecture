import { ApplicationFactory } from './application/ApplicationFactory';

function main() {
  const config = {
    appType: 'fastify',
    databaseType: 'memory',
  };
  const app = ApplicationFactory.create(config.appType);
  app.run(config);
}

main();
