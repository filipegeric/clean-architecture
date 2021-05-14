import { User } from '../domain/entity/User';
import { UserRepository } from '../domain/port/UserRepository';

export interface GetUsersRequest {
  limit: number;
  offset: number;
}
export interface GetUsersResponse {
  users: User[];
}

export class GetUsers {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: GetUsersRequest): Promise<GetUsersResponse> {
    const { limit, offset } = request;
    const users = await this.userRepository.getAllUsers(limit, offset);
    return { users };
  }
}
