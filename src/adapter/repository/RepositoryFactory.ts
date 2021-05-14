import { UserRepository } from '../../domain/port/UserRepository';
import { MemoryUserRepository } from './MemoryUserRepository';

export class RepositoryFactory {
  private static createMemoryRepository(type: any) {
    switch (type) {
      case UserRepository:
        return new MemoryUserRepository();
      default:
        throw new Error('Unknown repository type');
    }
  }

  static create(repositoryType: any, databaseType: string) {
    switch (databaseType) {
      case 'memory':
        return this.createMemoryRepository(repositoryType);
      default:
        throw new Error('Unknown database type');
    }
  }
}
