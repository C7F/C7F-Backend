import * as Knex from 'knex';
import logger from '../utils/logger';
import { migrations } from '../utils/constants';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('challenges', (table) => {
        table.uuid('id').unique().primary().notNullable();
        table.string('name').unique().notNullable();
        table.string('description').notNullable();
        table.string('category').notNullable();
        table.specificType('tags', 'TEXT[]');
        table.specificType('flags', 'TEXT[]');
        table.boolean('visible').defaultTo(false).notNullable();
        table.string('type').notNullable();
        table.float('points');
        table.float('initial_points');
        table.float('minimum_points');
        table.float('decay');
    })
        .then(() => {
            logger.info(`${migrations.tableCreated}challenges`);
        });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('challenges')
        .then(() => {
            logger.info(`${migrations.tableDropped}challenges`);
        });
}
