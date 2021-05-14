import { UserController } from '../adapter/controller/UserController';
import { RepositoryFactory } from '../adapter/repository/RepositoryFactory';
import { UserRepository } from '../domain/port/UserRepository';
import { GetUsers } from '../usecase/GetUsers';

interface ApplicationConfig {
  databaseType: string;
}

export abstract class Application {
  protected config: ApplicationConfig;

  protected userRepository: UserRepository;

  protected userController: UserController;

  private parseInputConfig(input?: any): ApplicationConfig {
    return {
      databaseType: input?.databaseType || 'memory',
    };
  }

  private setupRepositories() {
    this.userRepository = RepositoryFactory.create(UserRepository, this.config.databaseType);
  }

  private setupControllers() {
    this.userController = new UserController(new GetUsers(this.userRepository));
  }

  constructor(inputConfig?: any) {
    this.config = this.parseInputConfig(inputConfig);
    this.setupRepositories();
    this.setupControllers();
  }

  abstract run(): any;
}
