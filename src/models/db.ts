import Knex from 'knex';

import config from '../knexfile';
import { database } from '../utils/constants';
import logger from '../utils/logger';

const knex = Knex(config);

knex.raw("SELECT 'test connection';").then(() => {
    logger.info(database.connectionSuccess);
}).catch((err) => {
    logger.error(database.connectionFailure);
    throw err;
});

export default knex;
