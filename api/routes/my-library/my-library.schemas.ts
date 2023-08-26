import Joi from 'joi';

// Add or remove
export interface IAddOrRemoveBody {
    moviedb_id: string
};

const addOrRemoveMovieBody = Joi.object({
    moviedb_id: Joi.number().required()
});

// Rate movie
export interface IRateBody {
    moviedb_id: string
    rate: number
};

const rateBody = Joi.object({
    moviedb_id: Joi.number().required(),
    rate: Joi.number().min(0.5).max(10).required()
});

export default { addOrRemoveMovieBody, rateBody };
