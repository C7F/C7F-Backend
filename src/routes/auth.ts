import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { loginValidation, registerValidation, Team } from '../models/team';
import knex from '../models/db';

const router = Router();

// TODO: Move constants to another file
router.post("/login", async (req, res, next) => {
    const valid = loginValidation.validate(req.body);
    if (valid.error) {
        return res.json(400).json({
            success: true,
            error: "validationError",
            message: valid.error.message
        });
    }

    const team = await knex<Team>("teams").where("name", req.body.name).first();

    if (!team || !(await bcrypt.compare(req.body.password, team.password))) {
        // Invalid team name or password
        return res.json(400).json({
            success: false
        });
    }

    return res.json({
        success: true,
        token: await jwt.sign({
            name: team.name,
            email: team.email,
        }, process.env.JWT_TOKEN)
    });
});

router.post("/register", async (req, res, next) => {
    const valid = registerValidation.validate(req.body);

    if (valid.error) {
        return res.json(400).json({
            success: false,
            error: "validationError",
            message: valid.error.message
        });
    }

    const team = await knex<Team>("teams").where("name", req.body.name).first();

    if (team) {
        return res.status(400).json({
            success: false,
            error: "teamNotUnique"
        })
    }

    // TODO: Email verification logic, uuid generation
    await knex<Team>("teams").insert({
        email: req.body.email,  
    })
});

export default router;
