import { UserRepository } from '../../domain/port/UserRepository';
import { MemoryUserRepository } from './memory/MemoryUserRepository';
import { PostgresDatabase } from './postgres/PostgresDatabase';
import { PostgresUserRepository } from './postgres/PostgresUserRepository';

export class RepositoryFactory {
  private static createMemoryRepository(type: any) {
    switch (type) {
      case UserRepository:
        return new MemoryUserRepository();
      default:
        throw new Error('Unknown repository type');
    }
  }

  private static createPostgresRepository(type: any) {
    const connection = PostgresDatabase.getConnection();

    switch (type) {
      case UserRepository:
        return new PostgresUserRepository(connection);
      default:
        throw new Error('Unknown repository type');
    }
  }

  static create(repositoryType: any, databaseType: string) {
    switch (databaseType) {
      case 'memory':
        return this.createMemoryRepository(repositoryType);
      case 'postgres':
        return this.createPostgresRepository(repositoryType);
      default:
        throw new Error('Unknown database type');
    }
  }
}
