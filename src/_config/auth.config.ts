import { get } from 'env-var';

export const USER_JWT_SECRET = get('USER_JWT_SECRET').required().asString();
export const USER_JWT_EXPIRE = get('USER_JWT_EXPIRE').required().asString();
