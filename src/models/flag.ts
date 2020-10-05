import Joi from 'joi';

export interface Flag {
    id: string;
    challenge_id: string;
    flag: string;
}

// const id = Joi.string().required();
// const challenge_id = Joi.string().required();
const flag = Joi.string().required();

export const flagSubmissionValidation = Joi.object({
    flag,
});
