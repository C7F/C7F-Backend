import { Router } from 'express';
import { v4 } from 'uuid';
import { errors } from '../utils/constants';
import { flagSubmissionValidation } from '../models/flag';
import knex from '../models/db';
import { Challenge, challengeDeleteValidation, newChallengeValidation } from '../models/challenge';
import { Submission } from '../models/submissions';
import { authorizeAdmin } from '../middlewares/auth';

// import knex from '../models/db';

const router = Router();

router.post('/new', authorizeAdmin, async (req, res) => {
    const valid = newChallengeValidation.validate(req.body);

    if (valid.error) {
        return res.status(400).json({
            success: true,
            error: errors.validationError,
            message: valid.error.message,
        });
    }

    if (
        (req.body.type === 'static' && !req.body.points)
        || (req.body.type === 'dynamic' && !(req.body.initial_points && req.body.minimum_points && req.body.decay))
    ) {
        return res.status(400).json({
            success: false,
            error: errors.challengeTypePointsMismatch,
        });
    }
    const challenge = await knex<Challenge>('challenges').where('name', req.body.name).first();

    if (challenge) {
        return res.status(400).json({
            success: false,
            errors: errors.challengeNotUnique,
        });
    }

    const newChallenge: Challenge = {
        id: v4(),
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        tags: req.body.tags,
        visible: req.body.visible,
        flags: req.body.flags,
        type: req.body.type,
        points: req.body.points,
        initial_points: req.body.initial_points,
        minimum_points: req.body.minimum_points,
        decay: req.body.decay,
    };

    await knex<Challenge>('challenges').insert(newChallenge);

    return res.json({
        success: true,
        challenge: newChallenge,
    });
});

router.post('/delete', authorizeAdmin, async (req, res) => {
    const valid = challengeDeleteValidation.validate(req.body);
    if (valid.error) {
        return res.status(400).json({
            success: true,
            error: errors.validationError,
            message: valid.error.message,
        });
    }

    try {
        await knex<Challenge>('challenges').where('id', req.body.id).delete();
        return res.json({
            success: true,
        });
    } catch (e) {
        return res.json({
            success: false,
        });
    }
});

router.post('/submit', async (req, res) => {
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

    const challenge = await knex<Challenge>('challenges').select('id').where(req.body.flag, 'ANY(flags)').first();

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

router.get('/', async (_req, res) => {
    const challenges = await knex<Challenge>('challenges');
    return res.json({ success: true, challenges });
});

export default router;
