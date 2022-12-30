import { createClient, RedisClientType } from 'redis';
import { Environment } from './environment.config';
import { Logger } from './logger.config';

class RedisCache {
  private static instance: RedisCache;

  client: RedisClientType;

  constructor() {}

  static getInstance() {
    if (!RedisCache.instance) {
      RedisCache.instance = new RedisCache();
    }
    return RedisCache.instance;
  }

  async connect(): Promise<RedisClientType> {
    this.client = createClient({
      url: Environment.REDIS_URL,
    });
    this.client.on('error', (err) => {
      Logger.log('error', 'Error occured when connect to redis');
      process.exit(0);
    });
    this.client.on('connect', () => {
        Logger.log('info', 'Redis connected');
    })
    await this.client.connect();
    return this.client;
  }

  getClient(): RedisClientType {
    if (this.client) {
      return this.client;
    }
  }
}

const redisCache = RedisCache.getInstance();

export { redisCache as RedisCache };

export default redisCache.getClient();
