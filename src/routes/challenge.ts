import { Router } from 'express';

// import knex from '../models/db';

const router = Router();

router.get('/all', async (_req, res) => {
    res.json({ success: true });
});

export default router;
