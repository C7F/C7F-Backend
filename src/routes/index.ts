import { Router } from 'express';

import authRouter from './auth';
import challengeRouter from './challenge';

const router = Router();

router.use('/auth', authRouter);
router.use('/challenge', challengeRouter);

export default router;
