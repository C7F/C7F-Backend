import dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({
    path: join(__dirname, '../.env'),
});
const config = {
    client: 'postgres',
    connection: process.env.DATABASE_URL,
    migrations: {
        directory: join(__dirname, 'migrations'),
    },
};

export default config;
