import Joi from 'joi';

export interface BaseChallenge {
    id: string;
    name: string;
    description: string;
    category: string;
    tags: Array<string>;
    flags: Array<string>;
    visible: boolean;
    points: number;
}

export interface StaticChallenge extends BaseChallenge {
    type: 'static';
}

export interface DynamicChallenge extends BaseChallenge {
    type: 'dynamic';
    initial_points: number;
    minimum_points: number;
    decay: number;
}

export type Challenge = DynamicChallenge | StaticChallenge;

const id = Joi.string();
const name = Joi.string().required();
const description = Joi.string().required();
const category = Joi.string().required();
const tags = Joi.array().items(Joi.string()).required();
const visible = Joi.boolean().required();
const flags = Joi.array().items(Joi.string()).required();
const type = Joi.string().valid('static', 'dynamic').required();
const points = Joi.number();
const initialPoints = Joi.number();
const minimumPoints = Joi.number();
const decay = Joi.number();

export const newChallengeValidation = Joi.object({
    name,
    description,
    category,
    tags,
    visible,
    flags,
    type,
    points,
    initial_points: initialPoints,
    minimum_points: minimumPoints,
    decay,
});

export const challengeDeleteValidation = Joi.object({
    id,
});
