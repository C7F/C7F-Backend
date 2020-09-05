import dotenv from 'dotenv';
// Update with your config settings.

dotenv.config();

const config = {
    client: 'postgres',
    connection: {
        host: process.env.DB_HOST || '127.0.0.1',
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        user: process.env.DB_USER || 'c7f',
        password: process.env.DB_PASSWORD || 'c7f',
        database: process.env.DB_NAME || 'c7f',
    },
};

export default config;
