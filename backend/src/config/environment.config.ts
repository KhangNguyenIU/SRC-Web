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
      FE_URL: process.env.FE_URL.split(', '),
      REDIS_URL: process.env.REDIS_URL,
      UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
      UNSPLASH_SECRET_KEY: process.env.UNSPLASH_SECRET_KEY,
      FRB_P_KEY_ID: process.env.FRB_P_KEY_ID,
      FRB_P_KEY: process.env.FRB_P_KEY,
      FRB_CLIENT_EMAIL: process.env.FRB_CLIENT_EMAIL,
      FRB_CLIENT_ID: process.env.FRB_CLIENT_ID,
      FRB_AUTH_URI: process.env.FRB_AUTH_URI,
      FRB_TOKEN_URI: process.env.FRB_TOKEN_URI,
      FRB_AUTH_PROVIDER_X509_CERT_URL:
        process.env.FRB_AUTH_PROVIDER_X509_CERT_URL,
      FRB_CLIENT_X509_CERT_URL: process.env.FRB_CLIENT_X509_CERT_URL,
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
