import { type IMovieResult } from '../models/movie.models';
import env from 'react-dotenv';

export const getMoviesFromMovieDB = async (
  name: string,
  signal?: AbortSignal
): Promise<IMovieResult> => {
  return await fetch(`${env.API_URL}/movie/search?name=${name}`, {
    signal,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }).then(async (response) => {
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return await response.json();
  });
};
