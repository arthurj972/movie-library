import dotenv from 'dotenv';
import { type NextFunction, type Request, type Response } from 'express';
import mongoose from 'mongoose';

import { getMovieDBdetail } from '../../core/services/moviedb.service';
import UserLibraryModel, { type IUserLibrarySchema } from '../../models/user-library';

import { type IAddBody } from './my-library.schemas';

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
    const body: IAddBody = req.body as unknown as IAddBody;

    try {
        const movieAlreadyAdded = await UserLibraryModel.count({ moviedb_id: body.moviedb_id });
        if (movieAlreadyAdded === 0) {
            const movieDBdetails = await getMovieDBdetail(body.moviedb_id);
            const userLibrary: IUserLibrarySchema = {
                _id: new mongoose.Types.ObjectId(),
                moviedb_title: movieDBdetails.title,
                moviedb_overview: movieDBdetails.overview,
                moviedb_posterpath: movieDBdetails.poster_path,
                moviedb_id: movieDBdetails.id
            };
            const userLibraryDB = new UserLibraryModel(userLibrary);

            const movie = await userLibraryDB.save();
            res.status(201).json({
                message: 'movie has been added',
                movie
            });
        } else {
            next(new Error('movie already added on your library'));
        }
    } catch (error) {
        next(error);
    }
};

export default { get, addMovie };