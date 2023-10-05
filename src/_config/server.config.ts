import { get } from 'env-var';

export const SERVER_PORT = get('SERVER_PORT').required().asIntPositive();
export const SERVER_IS_ENABLE_DOCS = get('SERVER_IS_ENABLE_DOCS')
    .default('false')
    .asBool();
