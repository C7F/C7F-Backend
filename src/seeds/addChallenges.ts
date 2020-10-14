import * as Knex from 'knex';
import { v4 } from 'uuid';
import faker from 'faker';

const categories = ['pwn', 'web', 'forensics', 'crypto', 'linux', 'misc'];
export function createChallenge() {
    const category = categories[Math.floor(Math.random() * categories.length)];
    return {
        id: v4(),
        name: faker.lorem.words(2),
        description: faker.lorem.sentences(3),
        category,
        tags: [category],
        flags: [`flag{${faker.random.alphaNumeric(24)}}`],
        visible: true,
        type: 'static',
        points: faker.random.number({ min: 100, max: 500 }),
    };
}

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('challenges').del();

    const fakeChallenges = [];
    for (let i = 0; i < 15; i += 1) {
        fakeChallenges.push(createChallenge());
    }

    // Inserts seed entries
    await knex('challenges').insert(fakeChallenges);
}
