import { RepositoryFactory } from '../adapter/repository/RepositoryFactory';
import { UserRepository } from '../domain/port/UserRepository';
import { GetUsers, GetUsersRequest } from './GetUsers';

describe('GetUsers', () => {
  let getUsersUseCase: GetUsers;
  let repository: UserRepository;

  beforeEach(() => {
    repository = RepositoryFactory.create(UserRepository, 'memory');
    getUsersUseCase = new GetUsers(repository);
  });

  it('is defined', () => {
    expect(getUsersUseCase).toBeDefined();
  });

  it('returns an empty array of users', async () => {
    const req: GetUsersRequest = {
      limit: 10,
      offset: 0,
    };

    const { users } = await getUsersUseCase.execute(req);

    expect(users).toEqual([]);
  });
});
