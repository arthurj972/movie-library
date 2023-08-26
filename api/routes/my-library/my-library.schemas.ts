import Joi from 'joi';

// Add
export interface IAddBody {
    moviedb_id: string
};

const addMovie = Joi.object({
    moviedb_id: Joi.number().required()
});

export default { addMovie };
