import { Connection, ConnectionOptions, createConnection } from 'typeorm';

export class PostgresDatabase {
  private static connection: Connection;

  static getConnection(): Connection {
    if (!this.connection) {
      throw new Error('Connection does not exist');
    }
    return this.connection;
  }

  static async initialize(config: ConnectionOptions) {
    this.connection = await createConnection({
      ...config,
      entities: [process.cwd() + '/src/domain/entity/*.{js,ts}'],
    });
  }
}
