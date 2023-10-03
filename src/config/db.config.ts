import { get } from 'env-var';
import * as dotenv from 'dotenv';
dotenv.config();

export const databaseConfig = {
    type: 'mongodb',
    protocol: get('DB_PROTOCOL').required().asString(),
    host: get('DB_HOST').required().asString(),
    port: get('DB_PORT').required().asIntPositive(),
    username: get('DB_USERNAME').required().asString(),
    password: get('DB_PASSWORD').required().asString(),
    database: get('DB_NAME').required().asString(),
    authSource: get('DB_AUTH_SOURCE').required().asString(),
};

export const mongoConnectUrl = `${databaseConfig.protocol}://${databaseConfig.username}:${databaseConfig.password}@${databaseConfig.host}:${databaseConfig.port}/${databaseConfig.database}?authSource=${databaseConfig.authSource}`;
