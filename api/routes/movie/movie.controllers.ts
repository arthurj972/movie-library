import axios from 'axios';
import dotenv from 'dotenv';
import { type NextFunction, type Request, type Response } from 'express';
import { type IMovie } from '../../core/models/movie.models';
import { type IMovieDBdetailsResult, type IMovieDBresult } from '../../core/models/moviedb.models';
import { type IMovieParams, type ISearchQuery } from './movie.schemas';

dotenv.config();

const movieDbApi: string | undefined = process.env.MOVIEDB_API;
const movieDbToken: string | undefined = process.env.MOVIEDB_TOKEN;

const get = (req: Request, res: Response): void => {
    res.send('Movie Library API - Movie');
};

const search = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const query: ISearchQuery = req.query as unknown as ISearchQuery;
    try {
        const response = await axios.get(`${movieDbApi}/3/search/movie?query=${query.name}&include_adult=false&language=fr-FR&page=1`, {
            headers: { Authorization: `Bearer ${movieDbToken}` }
        });
        const results: IMovieDBresult[] = response.data.results;

        const finalMovies = results.map(movie => {
            const finalMovie: IMovie = {
                title: movie.title,
                poster_path: movie.poster_path,
                date: movie.release_date,
                overview: movie.overview,
                on_my_library: false,
                moviedb_id: movie.id
            };
            return finalMovie;
        });

        res.json({
            movies: finalMovies
        });
    } catch (error) {
        next(error);
    }
};

const movie = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const params: IMovieParams = req.params as unknown as IMovieParams;
    try {
        const response = await axios.get(`${movieDbApi}/3/movie/${params.id}&language=fr-FR`, {
            headers: { Authorization: `Bearer ${movieDbToken}` }
        });
        const movie: IMovieDBdetailsResult = response.data;

        res.json({
            movie
        });
    } catch (error) {
        next(error);
    }
};

export default { get, search, movie };
