import * as Knex from 'knex';

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
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('teams');
}
