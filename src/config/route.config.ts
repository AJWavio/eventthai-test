import { get } from 'env-var';
import * as dotenv from 'dotenv';
dotenv.config();

const v1 = 'v1';

const countryRoot = get('API_ROOT_COUNTRY').required().asString();
const userRoot = get('API_ROOT_USER').required().asString();

export const routesV1 = {
    version: v1,
    country: {
        root: countryRoot,
        getAll: countryRoot,
        queryName: `/${countryRoot}/:name`,
        queryCode: `/${countryRoot}/code/:code`,
    },
    user: {
        root: userRoot,
        login: `/${userRoot}/login`,
    },
};
