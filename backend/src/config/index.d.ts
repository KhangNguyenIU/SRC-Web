import { UserDecode } from "@interfaces/user.interface";

declare global {
    namespace Express {
        interface Request{
            user: UserDecode
        }
    }
}

export namespace Nodejs{
    interface ProcessEnv {
        NODE_ENV: string,
        MONGO_URI: string,
        PORT: number,
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
        DB_MIGRATIONS: string;
        DB_CACHE: boolean;
        REDIS_URL: string;
    }
}

