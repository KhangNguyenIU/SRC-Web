import 'reflect-metadata';

import { DataSource } from 'typeorm';
import { DatabaseEngine } from '@types';
import { config } from '@config/env.config';
import { Environment } from './environment.config';

export class DatabaseConfig {
  private static instance: DatabaseConfig;

  appDataSource: DataSource;

  private constructor() {}

  static get(): DatabaseConfig {
    if (!DatabaseConfig.instance) {
      DatabaseConfig.instance = new DatabaseConfig();
    }
    return DatabaseConfig.instance;
  }

  plug(): DatabaseConfig {
    if (!this.appDataSource) {
      this.appDataSource = new DataSource({
        type: "postgres" ,
        host: Environment.DB_HOST,
        port: Environment.DB_PORT,
        username: Environment.DB_USERNAME,
        password: Environment.DB_PASSWORD,
        database: Environment.DB_DATABASE,
        entities: [Environment.DB_ENTITIES],
        synchronize: Environment.DB_SYNCHRONIZE,
        logging: Environment.DB_LOGGING,
      });
    }
    return this;
  }
}

const appDataSource = DatabaseConfig.get().plug().appDataSource;

export { appDataSource as AppDataSource };
