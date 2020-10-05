import Joi from 'joi';

const name = Joi.string().pattern(/^[^\s]{3,100}$/).required();
const email = Joi.string().email().required();
const password = Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,255}$/).required();
const loginToken = Joi.string().required();

export const loginValidation = Joi.object({
    name,
    password,
});

export const registerValidation = Joi.object({
    name,
    email,
    password,
});

export const tokenLoginValidation = Joi.object({
    loginToken,
});

export interface Team {
    id: string;
    name: string;
    email: string;
    admin: boolean;
    password: string;
    verified: boolean;
    login_token: string;
    email_verification_token: string;
    password_reset_token: string;
}
