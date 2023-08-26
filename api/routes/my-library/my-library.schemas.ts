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
    rate: Joi.number().min(0.5).max(10).required()
});

export default { userMovieParams, rateBody };
