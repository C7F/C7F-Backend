import { Router } from 'express';

import authRouter from './auth';
import challengeRouter from './challenge';
import { authorizeTeam } from '../middlewares/auth';

const router = Router();

router.use('/ping', (_req, res) => {
    res.send('pong!');
});

router.use('/auth', authRouter);

router.use(authorizeTeam);

router.use('/challenges', challengeRouter);

export default router;
