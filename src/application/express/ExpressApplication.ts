import express, { Express } from 'express';

import { Application } from '../Application';

export class ExpressApplication extends Application {
  private app: Express;

  private setupRoutes() {
    // TODO
    this.app.get('/users', async (req, res) => {
      const { limit, offset } = req.query;
      const parsedLimit = parseInt(limit as string) || 10;
      const parsedOffset = parseInt(offset as string) || 0;

      const users = await this.userController.getUsers({
        limit: parsedLimit,
        offset: parsedOffset,
      });

      res.json(users);
    });
  }

  run() {
    this.app = express();

    this.setupRoutes();

    const port = this.config.port;
    this.app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Express application running on port ${port}...`);
    });
  }
}
