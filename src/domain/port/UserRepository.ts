import { User } from '../entity/User';

export abstract class UserRepository {
  abstract getAllUsers(limit: number, offset: number): Promise<User[]>;
}
