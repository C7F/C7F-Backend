import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('flags', (table) => {
        table.uuid('id').unique().primary().notNullable();
        table.uuid('challenge_id').notNullable();
        table.uuid('flag').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('flags');
}
