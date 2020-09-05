import Knex from 'knex';
import config from '../knexfile';

const knex = Knex(config);

knex.raw("SELECT 'test connection';").then(() => {
    console.log('Connected to database successfully');
}).catch((err) => {
    console.log('Failed to connect to database');
    throw err;
});

export default knex;
