interface ENV {
  NODE_ENV: string | undefined;
  PORT: number | undefined;
  MONGO_URI: string | undefined;
  DB_USERNAME: string | undefined;
}

interface Config {
  NODE_ENV: string;
  PORT: number;
  MONGO_URI: string;
  DB_USERNAME: string;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    MONGO_URI: process.env.MONGO_URI,
    DB_USERNAME: process.env.DB_USERNAME,
  };
};

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export { sanitizedConfig as config };
