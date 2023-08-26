import mongoose, { Schema } from 'mongoose';

interface IUserLibrarySchema {
    _id: mongoose.Types.ObjectId
    user_id?: mongoose.Types.ObjectId
    moviedb_title: string
    moviedb_overview: string
    moviedb_posterpath?: string
    moviedb_id: number
    raiting?: number
}

const userLibrary = new Schema<IUserLibrarySchema>({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId }, // no used for moment
    moviedb_title: { type: String, required: true },
    moviedb_overview: { type: String, required: true },
    moviedb_posterpath: { type: String },
    moviedb_id: { type: Number, required: true },
    raiting: { type: Number }

});

const UserLibraryModel = mongoose.model<IUserLibrarySchema>('UserLibrary', userLibrary);

export default UserLibraryModel;
export type { IUserLibrarySchema };
