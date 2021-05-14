import { GetUsers } from '../../usecase/GetUsers';

export class UserController {
  constructor(private readonly getUsersUseCase: GetUsers) {}

  getUsers(options: { limit: number; offset: number }) {
    const { limit, offset } = options;
    return this.getUsersUseCase.execute({ limit, offset });
  }
}
