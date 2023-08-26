import dotenv from 'dotenv';
import { type NextFunction, type Request, type Response } from 'express';

import UserLibraryModel from '../../models/user-library';

import { addMovieOnLibrairy } from '../../core/services/userlibrairy.service';
import { type IRateBody, type IUserMovieParams } from './my-library.schemas';

dotenv.config();

const get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const library = await UserLibraryModel.find();
        res.status(200).json({
            movies: library.map((movie) => ({
                moviedb_id: movie.moviedb_id,
                title: movie.moviedb_title,
                overview: movie.moviedb_overview,
                poster_path: movie.moviedb_posterpath
            }))
        });
    } catch (error) {
        next(error);
    }
};

const addMovie = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const params: IUserMovieParams = req.params as unknown as IUserMovieParams;

    try {
        const movie = await addMovieOnLibrairy(params.moviedb_id);
        res.status(201).json({
            message: 'movie has been added',
            movie
        });
    } catch (error) {
        next(error);
    }
};

const rateMovie = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const params: IUserMovieParams = req.params as unknown as IUserMovieParams;
    const body: IRateBody = req.body as unknown as IRateBody;

    try {
        let movieOnLibrary = await UserLibraryModel.findOne({ moviedb_id: params.moviedb_id });
        if (!movieOnLibrary) {
            movieOnLibrary = await addMovieOnLibrairy(params.moviedb_id);
        }
        const movie = await UserLibraryModel.findOneAndUpdate(
            { moviedb_id: params.moviedb_id },
            { raiting: body.rate },
            {
                new: true
            }
        );
        res.status(202).json({
            message: 'movie updated from your library',
            movie
        });
    } catch (error) {
        next(error);
    }
};

const removeMovie = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const params: IUserMovieParams = req.params as unknown as IUserMovieParams;

    try {
        const movieOnLibrary = await UserLibraryModel.findOne({ moviedb_id: params.moviedb_id });
        if (movieOnLibrary) {
            await UserLibraryModel.deleteOne({ moviedb_id: params.moviedb_id });
            res.status(200).json({
                message: 'movie removed from your library'
            });
        } else {
            next(new Error('movie not in your library'));
        }
    } catch (error) {
        next(error);
    }
};

export default { get, addMovie, rateMovie, removeMovie };
