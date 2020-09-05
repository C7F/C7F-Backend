import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';

import {
    loginValidation, registerValidation, Team, tokenLoginValidation,
} from '../models/team';
import knex from '../models/db';
import { errors } from '../constants';

async function generateJWT(team: Team) {
    return jwt.sign({
        name: team.name,
        email: team.email,
    },
    process.env.JWT_SECRET,
    {
        expiresIn: '10 days',
    });
}

const router = Router();

// TODO: Move constants to another file
router.post('/login', async (req, res) => {
    const valid = loginValidation.validate(req.body);
    if (valid.error) {
        return res.status(400).json({
            success: true,
            error: errors.validationError,
            message: valid.error.message,
        });
    }

    const team = await knex<Team>('teams').where('name', req.body.name).first();
    if (!team || !(await bcrypt.compare(req.body.password, team.password))) {
        // Invalid team name or password
        return res.status(400).json({
            success: false,
            error: errors.invalidCredentials,
        });
    }

    return res.json({
        success: true,
        token: await generateJWT(team),
    });
});

router.post('/tokenLogin', async (req, res) => {
    const valid = tokenLoginValidation.validate(req.body);

    if (valid.error) {
        return res.status(400).json({
            success: true,
            error: errors.validationError,
            message: valid.error.message,
        });
    }

    const team = await knex<Team>('teams').where('login_token', req.body.loginToken).first();

    if (!team) {
        return res.status(400).json({
            success: false,
            error: errors.invalidCredentials,
        });
    }
    return res.json({
        success: false,
        token: await generateJWT(team),
    });
});

router.post('/register', async (req, res) => {
    const valid = registerValidation.validate(req.body);

    if (valid.error) {
        res.status(400).json({
            success: false,
            error: errors.validationError,
            message: valid.error.message,
        });
        return;
    }

    const team = await knex<Team>('teams').where('name', req.body.name).first();

    if (team) {
        res.status(400).json({
            success: false,
            error: errors.teamNotUnique,
        });
        return;
    }

    // TODO: Send verification email
    const newTeam: Team = {
        id: v4(),
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        verified: false,
        email_verification_token: v4(),
        login_token: v4(),
        password_reset_token: null,
    };

    await knex<Team>('teams').insert(newTeam);

    res.json({
        success: true,
    });
});

export default router;
