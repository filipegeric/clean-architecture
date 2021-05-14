import { ExpressApplication } from './ExpressApplication';
import { FastifyApplication } from './FastifyApplication';

export class ApplicationFactory {
  static create(applicationType: string) {
    switch (applicationType) {
      case 'express':
        return new ExpressApplication();
      case 'fastify':
        return new FastifyApplication();
      default:
        throw new Error('Unknown application type');
    }
  }
}
