import { Router } from 'express';
import { v4 } from 'uuid';
import { errors } from '../utils/constants';
import { flagSubmissionValidation } from '../models/flag';
import knex from '../models/db';
import { Challenge } from '../models/challenge';
import { Submission } from '../models/submissions';
import authorizeTeam from '../middlewares/auth';

// import knex from '../models/db';

const router = Router();

router.post('/submit', authorizeTeam, async (req, res) => {
    const valid = flagSubmissionValidation.validate(req.body);
    if (valid.error) {
        return res.status(400).json({
            success: true,
            error: errors.validationError,
            message: valid.error.message,
        });
    }

    // TODO: Check if team has already solved challenge

    const submission: Submission = {
        id: v4(),
        team_id: res.locals.team.id,
        flag: req.body.flag,
    };
    knex<Submission>('submissions').insert(submission);

    const challenge: {id: string} = await knex
        .select('c.id as "id"')
        .from('flags as f')
        .join('challenges', 'f.challenge_id', 'c.id')
        .where('f.flag', req.body.flag)
        .first();

    if (challenge) {
        return res.json({
            success: true,
            id: challenge.id,
        });
    }
    return res.json({
        success: true,
    });
});

router.get('/', authorizeTeam, async (_req, res) => {
    const challenges = await knex<Challenge>('challenges');
    return res.json({ success: true, challenges });
});

export default router;
