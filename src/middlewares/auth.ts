import Express from 'express';
import jwt from 'jsonwebtoken';

import { errors } from '../utils/constants';

export function authorizeTeam(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction,
): void {
    let token = req.headers.authorization;

    if (!token) {
        res.status(401).json({
            success: false,
            message: errors.invalidJWT,
        });

        return;
    }

    try {
        token = token.replace('Bearer', '').trim();

        res.locals.team = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        res.status(400).json({
            success: false,
            error: errors.invalidJWT,
        });
    }
}

export function authorizeAdmin(
    _req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction,
): void {
    if (res.locals.team && res.locals.team.admin) {
        next();
    } else {
        res.status(403).json({
            success: false,
            error: errors.onlyAdminAllowed,
        });
    }
}
