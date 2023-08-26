import axios from 'axios';
import dotenv from 'dotenv';
import { type NextFunction, type Request, type Response } from 'express';

import { nFormatter } from '../../core/functions';
import { getMovieDBdetail } from '../../core/services/moviedb.service';

import { type IMovie, type IMovieDetails } from '../../core/models/movie.models';
import { type IMovieDBresult } from '../../core/models/moviedb.models';

import UserLibraryModel from '../../models/user-library';
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
        const [movie, movieOnMyLibrary] = await Promise.all([
            getMovieDBdetail(params.id),
            UserLibraryModel.findOne({ moviedb_id: params.id })
        ]);

        // clear data (removes unnecessary variables & adds new)
        const finalMovie: IMovieDetails = {
            backdrop_path: movie.backdrop_path,
            budget: movie.budget,
            budget_format: nFormatter(movie.budget, 2),
            genres: movie.genres,
            homepage: movie.homepage,
            moviedb_id: movie.id,
            original_language: movie.original_language,
            original_title: movie.original_title,
            overview: movie.overview,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            revenue: movie.revenue,
            revenue_format: nFormatter(movie.revenue, 2),
            status: movie.status,
            title: movie.title,
            vote_average: movie.vote_average,
            vote_count: movie.vote_count,
            on_my_library: (movieOnMyLibrary !== null),
            user_raiting: movieOnMyLibrary?.raiting ? movieOnMyLibrary.raiting : 0
        }

        res.json({
            movie: finalMovie
        });
    } catch (error) {
        next(error);
    }
};

export default { get, search, movie };
