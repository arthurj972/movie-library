import Joi from 'joi';

// Add
export interface IAddOrRemoveBody {
    moviedb_id: string
};

const addOrRemoveMovieBody = Joi.object({
    moviedb_id: Joi.number().required()
});

export default { addOrRemoveMovieBody };
