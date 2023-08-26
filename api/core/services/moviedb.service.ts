import axios from 'axios';
import dotenv from 'dotenv';

import { type IMovieDBdetailsResult } from '../models/moviedb.models';

dotenv.config();

const movieDbApi: string | undefined = process.env.MOVIEDB_API;
const movieDbToken: string | undefined = process.env.MOVIEDB_TOKEN;

export const getMovieDBdetail = async (id: string): Promise<IMovieDBdetailsResult> => {
    const response = await axios.get(`${movieDbApi}/3/movie/${id}&language=fr-FR`, {
        headers: { Authorization: `Bearer ${movieDbToken}` }
    });
    const movie: IMovieDBdetailsResult = response.data;
    return movie;
};
