import { get } from 'env-var';

export const SERVER_PORT = get('SERVER_PORT').required().asIntPositive();
