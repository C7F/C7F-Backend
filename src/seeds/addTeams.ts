import * as Knex from 'knex';
import faker from 'faker';
import { v4 } from 'uuid';

export function createFakeTeam() {
    return {
        id: v4(),
        admin: false,
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        verified: true,
        login_token: v4(),
        email_verification_token: v4(),
        password_reset_token: v4(),
    };
}

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('teams').del();

    const fakeTeams = [];
    for (let i = 0; i < 100; i += 1) {
        fakeTeams.push(createFakeTeam());
    }
    // Inserts seed entries
    await knex('teams').insert(fakeTeams);
}
