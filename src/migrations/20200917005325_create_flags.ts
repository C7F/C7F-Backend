import * as Knex from 'knex';
import logger from '../utils/logger';
import { migrations } from '../utils/constants';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('flags', (table) => {
        table.uuid('id').unique().primary().notNullable();
        table.uuid('challenge_id').notNullable();
        table.uuid('flag').notNullable();
    })
        .then(() => {
            logger.info(`${migrations.tableCreated}flags`);
        });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('flags')
        .then(() => {
            logger.info(`${migrations.tableDropped}flags`);
        });
}
