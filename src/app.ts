import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import appRoutes from './routes';

dotenv.config();

const app = express();

app.set('PORT', process.env.PORT || 3000);
app.use(bodyParser.json());

const { NODE_ENV } = process.env;
if (NODE_ENV === 'dev') {
    app.use(cors());
}

app.use(appRoutes);

app.listen(app.get('PORT'), () => {
    console.log('Server listening on port ', app.get('PORT'));
});
