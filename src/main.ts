import { ApplicationConfig } from './application/Application';
import { ApplicationFactory } from './application/ApplicationFactory';

async function main() {
  const config: ApplicationConfig = {
    appType: 'express',
    databaseType: 'postgres',
    port: 3000,
    postgres: {
      host: 'db',
      username: 'dev',
      password: 'dev',
      port: 5432,
      database: 'clean-arch-db',
      synchronize: true,
      logging: true,
    },
  };

  const app = ApplicationFactory.create(config);

  await app.start();
}

main();
