import Joi from 'joi';

// Search
export interface ISearchQuery {
    name: string
};

const search = Joi.object({
    name: Joi.string().min(3).required()
});

// Movie details
export interface IMovieParams {
    id: string
};

export default { search };
