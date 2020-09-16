import Knex from 'knex';

import config from '../knexfile';
import { database } from '../utils/constants';
import logger from '../utils/logger';

const knex = Knex(config);

async function connectDatabase() {
    try {
        logger.info(database.runMigrations);
        await knex.migrate.latest();
        logger.info(database.ranMigrations);
        logger.info(database.connectionSuccess);
    } catch (err) {
        logger.error(database.connectionFailure);
        process.exit(1);
    }
}

connectDatabase();

export default knex;
