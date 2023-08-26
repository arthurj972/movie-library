import mongoose from 'mongoose';
import UserLibraryModel, { type IUserLibrarySchema } from '../../models/user-library';
import { getMovieDBdetail } from './moviedb.service';

export const addMovieOnLibrairy = async (movieDBid: string): Promise<any> => {
    const movieAlreadyAdded = await UserLibraryModel.count({ moviedb_id: movieDBid });
    if (movieAlreadyAdded === 0) {
        const movieDBdetails = await getMovieDBdetail(movieDBid);
        const userLibrary: IUserLibrarySchema = {
            _id: new mongoose.Types.ObjectId(),
            moviedb_title: movieDBdetails.title,
            moviedb_overview: movieDBdetails.overview,
            moviedb_posterpath: movieDBdetails.poster_path,
            moviedb_id: movieDBdetails.id
        };
        const userLibraryDB = new UserLibraryModel(userLibrary);

        const movie = await userLibraryDB.save();
        return movie;
    } else {
        throw new Error('movie already added on your library');
    }
};
