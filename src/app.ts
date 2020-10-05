import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import appRoutes from './routes';
import logger from './utils/logger';

dotenv.config();

const app = express();

app.set('PORT', process.env.PORT || 3000);
app.use(bodyParser.json());

const { ALLOW_CORS, ALLOWED_ORIGINS } = process.env;
if (ALLOW_CORS === 'true') {
    const corsOptions = {
        origin: ALLOWED_ORIGINS ? ALLOWED_ORIGINS.split(',') : '*',
    };

    app.use(cors(
        corsOptions,
    ));
}

app.use(appRoutes);

app.listen(app.get('PORT'), () => {
    logger.info(`Server listening on port ${app.get('PORT')}.`);
});
