import { UserController } from '../adapter/controller/UserController';
import { PostgresDatabase } from '../adapter/repository/postgres/PostgresDatabase';
import { RepositoryFactory } from '../adapter/repository/RepositoryFactory';
import { UserRepository } from '../domain/port/UserRepository';
import { GetUsers } from '../usecase/GetUsers';

export interface ApplicationConfig {
  appType: string;
  databaseType: string;
  port: number;
  [key: string]: any;
}

export abstract class Application {
  protected userRepository: UserRepository;

  protected userController: UserController;

  constructor(protected readonly config: ApplicationConfig) {}

  private setupDatabaseConnection() {
    switch (this.config.databaseType) {
      case 'memory':
        return;
      case 'postgres':
        return PostgresDatabase.initialize({
          ...this.config.postgres,
          type: 'postgres',
        });
      default:
        throw new Error('Unknown database type');
    }
  }

  private async setupRepositories() {
    await this.setupDatabaseConnection();
    this.userRepository = RepositoryFactory.create(UserRepository, this.config.databaseType);
  }

  private setupControllers() {
    this.userController = new UserController(new GetUsers(this.userRepository));
  }

  private async bootstrap() {
    await this.setupRepositories();
    this.setupControllers();
  }

  public async start() {
    await this.bootstrap();
    await this.run();
  }

  protected abstract run(): any;
}
