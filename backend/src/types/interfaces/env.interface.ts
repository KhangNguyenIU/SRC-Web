export interface ENV {
  NODE_ENV: string | undefined;
  PORT: number | undefined;
  JWT_SECRET: string | undefined;
  DB_TYPE: string | undefined;
  DB_HOST: string | undefined;
  DB_PORT: number | undefined;
  DB_USERNAME: string | undefined;
  DB_PASSWORD: string | undefined;
  DB_DATABASE: string | undefined;
  DB_SYNCHRONIZE: boolean | undefined;
  DB_LOGGING: boolean | undefined;
  DB_ENTITIES: string | undefined;
  DB_CACHE: boolean | undefined;
  CLOUDINARY_CLOUD_NAME: string | undefined;
  CLOUDINARY_API_KEY: string | undefined;
  CLOUDINARY_API_SECRET: string | undefined;
  FE_URL: string | undefined;
}

export interface EnvConfig {
  NODE_ENV: string;
  PORT: number;
  JWT_SECRET: string;
  DB_TYPE: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  DB_SYNCHRONIZE: boolean;
  DB_LOGGING: boolean;
  DB_ENTITIES: string;
  DB_CACHE: boolean;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  FE_URL: string;
}
