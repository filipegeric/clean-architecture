import { ExpressApplication } from './ExpressApplication';
import { FastifyApplication } from './FastifyApplication';

export class ApplicationFactory {
  static create(config?: any) {
    switch (config?.appType) {
      case 'express':
        return new ExpressApplication(config);
      case 'fastify':
        return new FastifyApplication(config);
      default:
        throw new Error('Unknown application type');
    }
  }
}
