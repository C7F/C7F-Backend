import Knex from 'knex';
import { join } from 'path';

import config from '../knexfile';
import { database } from '../utils/constants';
import logger from '../utils/logger';

const knex = Knex(config);

const query = 'SELECT table_name FROM information_schema.tables WHERE table_schema = current_schema() AND table_catalog = ?';
const bindings = [knex.client.database()];
knex.raw(query, bindings).then((result) => {
    logger.info(database.connectionSuccess);
    if (result.rows.length === 0) {
        logger.info(database.runMigrations);
        knex.migrate.latest({ directory: join(__dirname, '../migrations') }).then(() => {
            logger.info(database.ranMigrations);
        });
    }
}).catch((err) => {
    logger.error(database.connectionFailure);
    process.exit(1);
    throw err;
});

export default knex;
