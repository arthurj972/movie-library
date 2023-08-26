import mongoose, { Schema } from 'mongoose';

interface IUserLibrarySchema {
    _id: mongoose.Types.ObjectId
    added_date: Date
    user_id?: mongoose.Types.ObjectId
    moviedb_title: string
    moviedb_overview: string
    moviedb_release_date: Date
    moviedb_posterpath?: string
    moviedb_id: number
    raiting?: number
}

const userLibrary = new Schema<IUserLibrarySchema>({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId }, // no used for moment
    added_date: { type: Date, required: true },
    moviedb_title: { type: String, required: true },
    moviedb_overview: { type: String, required: true },
    moviedb_release_date: { type: Date },
    moviedb_posterpath: { type: String },
    moviedb_id: { type: Number, required: true },
    raiting: { type: Number }
}).index({ moviedb_title: 'text', moviedb_overview: 'text' });

const UserLibraryModel = mongoose.model<IUserLibrarySchema>('UserLibrary', userLibrary);

export default UserLibraryModel;
export type { IUserLibrarySchema };
