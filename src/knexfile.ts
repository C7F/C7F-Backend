import dotenv from 'dotenv';
// Update with your config settings.

dotenv.config();

const config = {
    client: 'postgres',
    connection: process.env.DATABASE_URL,
};

export default config;
