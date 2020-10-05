import * as Knex from 'knex';
import { migrations } from '../utils/constants';
import logger from '../utils/logger';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('submissions', (table) => {
        table.uuid('id').unique().primary().notNullable();
        table.string('flag').notNullable();
        table.uuid('team_id').notNullable().references('id').inTable('teams');
        table.timestamp('submitted_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('submissions')
        .then(() => {
            logger.info(`${migrations.tableDropped}flags`);
        });
}
