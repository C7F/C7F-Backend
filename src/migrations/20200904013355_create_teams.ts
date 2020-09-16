import * as Knex from 'knex';
import logger from '../utils/logger';
import { migrations } from '../utils/constants';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('teams', (table) => {
        table.uuid('id').unique().primary().notNullable();
        table.string('name', 255).unique().notNullable();
        table.string('email', 255).unique().notNullable();
        table.string('password', 60).unique().notNullable();
        table.boolean('verified').defaultTo(false).notNullable();
        table.uuid('login_token').unique();
        table.uuid('email_verification_token').unique();
        table.uuid('password_reset_token').unique();
    })
        .then(() => {
            logger.info(`${migrations.tableCreated}teams`);
        });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('teams')
        .then(() => {
            logger.info(`${migrations.tableDropped}teams`);
        });
}
