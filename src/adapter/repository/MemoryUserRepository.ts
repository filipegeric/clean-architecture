import { User } from '../../domain/entity/User';
import { UserRepository } from '../../domain/port/UserRepository';

export class MemoryUserRepository implements UserRepository {
  private readonly users: User[] = [];

  async getAllUsers(limit: number, offset: number): Promise<User[]> {
    const result = this.users.slice(offset, offset + limit);
    return Promise.resolve(result);
  }
}
