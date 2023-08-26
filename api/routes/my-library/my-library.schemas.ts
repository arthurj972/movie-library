import Joi from 'joi';

// for POST / PUT / PATH requests
export interface IUserMovieParams {
    moviedb_id: string
};

const userMovieParams = Joi.object({
    moviedb_id: Joi.number().required()
});

// Rate movie body
export interface IRateBody {
    rate: number
};

const rateBody = Joi.object({
    rate: Joi.number().min(0.5).max(5).required()
});

// Search params
export interface ISearchParams {
    name: string
};

const searchParams = Joi.object({
    name: Joi.string().required()
});

export default { userMovieParams, rateBody, searchParams };
