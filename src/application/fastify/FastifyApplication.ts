import fastify, { FastifyInstance } from 'fastify';

import { Application } from '../Application';

export class FastifyApplication extends Application {
  private app: FastifyInstance;

  private setupRoutes() {
    this.app.get('/users', async (req) => {
      const limit = parseInt((req.query as any).limit) || 10;
      const offset = parseInt((req.query as any).offset) || 0;
      const response = await this.userController.getUsers({ limit, offset });
      return response;
    });
  }

  run() {
    const port = this.config.port;

    this.app = fastify({ logger: false });

    this.setupRoutes();

    this.app
      .listen(port)
      .then(() => {
        // eslint-disable-next-line no-console
        console.log(`Fastify app listening on port ${port}...`);
      })
      // eslint-disable-next-line no-console
      .catch(console.error);
  }
}
