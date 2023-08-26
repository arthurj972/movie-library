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

// Search queries
export interface ISearchQuery {
    sort_type?: string
};

const searchQuery = Joi.object({
    sort_type: Joi.string().valid('title', 'added', 'release')
});

export default { userMovieParams, rateBody, searchParams, searchQuery };
