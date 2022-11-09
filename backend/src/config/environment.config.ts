import { ENV, EnvConfig } from '@interfaces/env.interface';
import * as Dotenv from 'dotenv';
import { Logger } from './logger.config';

class Ennvironment {
  private static instance: Ennvironment;

  private constructor() {}

  static get(): Ennvironment {
    if (!Ennvironment.instance) {
      Ennvironment.instance = new Ennvironment();
    }
    return Ennvironment.instance;
  }

  init(): Ennvironment {
    Dotenv.config();
    return this;
  }

  getConfig(): ENV {
    return {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT ? Number(process.env.PORT) : 8000,
      JWT_SECRET: process.env.JWT_SECRET,
      DB_TYPE: process.env.DB_TYPE || 'postgres',
      DB_HOST: process.env.DB_HOST || 'localhost',
      DB_PORT: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3432,
      DB_USERNAME: process.env.DB_USERNAME,
      DB_PASSWORD: process.env.DB_PASSWORD,
      DB_DATABASE: process.env.DB_DATABASE,
      DB_SYNCHRONIZE: process.env.DB_SYNCHRONIZE === 'true',
      DB_LOGGING: process.env.DB_LOGGING === 'true',
      DB_ENTITIES: process.env.DB_ENTITIES,
      DB_CACHE: process.env.DB_CACHE === 'true',
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    };
  }

  getSanitzedConfig(config: ENV): EnvConfig {
    for (const [key, value] of Object.entries(config)) {
      if (value === undefined) {
        Logger.log('error', `Missing key ${key} in environment variables`);
        process.exit(0);
      }
    }
    return config as EnvConfig;
  }
}

const environment = Ennvironment.get()
  .init()
  .getSanitzedConfig(Ennvironment.get().getConfig());

export { environment as Environment };
