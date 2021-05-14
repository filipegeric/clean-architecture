import { Connection, Repository } from 'typeorm';

import { User } from '../../../domain/entity/User';
import { UserRepository } from '../../../domain/port/UserRepository';

export class PostgresUserRepository implements UserRepository {
  private repository: Repository<User>;

  constructor(readonly connection: Connection) {
    this.repository = connection.getRepository(User);
  }

  async getAllUsers(limit: number, offset: number): Promise<User[]> {
    const users = await this.repository.find({ take: limit, skip: offset });
    return users;
  }
}
