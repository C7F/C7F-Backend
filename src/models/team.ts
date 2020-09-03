import Joi from 'joi';

const name = Joi.string().pattern(/^[^\s]{3,100}$/);
const email = Joi.string().email();
const password = Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,255}$/);

export const loginValidation = Joi.object({
    name,
    password,
});

export const registerValidation = Joi.object({
    name,
    email,
    password,
});

export interface Team {
    id: string;
    name: string;
    email: string;
    password: string;
    verified: boolean;
    login_token: string;
    email_verification_token: string;
    password_reset_token: string;
}
