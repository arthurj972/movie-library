import React, { useState, type ReactElement, useEffect, type SyntheticEvent } from 'react';
import { useParams } from 'react-router-dom';
import env from 'react-dotenv';

import { type IMovieDetails, type IMovieDetailsResult } from '../models/movie.models';

import ErrorMessage from '../components/ErrorMessage';
import MovieHoverRating from '../components/MovieHoverRating';

import { Button, Checkbox, Chip, Tooltip } from '@mui/material';

// icons
import TodayIcon from '@mui/icons-material/Today';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LanguageIcon from '@mui/icons-material/Language';
import RedeemIcon from '@mui/icons-material/Redeem';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Movie = (): ReactElement => {
  const { id } = useParams();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [movie, setMovie] = useState<IMovieDetails | null>(null);
  const [updateOnLibraryLoading, setUpdateOnLibraryLoading] = useState<boolean>(false);

  /**
   * Get movie details
   * @param {string} id
   * @returns {Promise<IMovieDetailsResult>}
   */
  const getMovieDetailsApi = async (
    id: string
  ): Promise<IMovieDetailsResult> => {
    return await fetch(`${env.API_URL}/movie/details/${id}`, {
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

  /**
   * Add or remove a movie on user library
   * @param {boolean} add choose your method
   * @returns {Promise}
   */
  const addOrRemoveToUserLibrary = async (add: boolean = true): Promise<void> => {
    return await fetch(`${env.API_URL}/my-library`, {
      method: add ? 'POST' : 'DELETE',
      body: JSON.stringify({
        moviedb_id: id
      }),
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

  const onSavedOnLibraryChange = (
    event: SyntheticEvent,
    checked: boolean
  ): void => {
    setUpdateOnLibraryLoading(true);

    // if check = add on library
    // id no check = remove on library
    addOrRemoveToUserLibrary(checked)
      .then((data) => {
        setErrorMessage(null);
        setUpdateOnLibraryLoading(false);
        if (movie != null) {
          movie.on_my_library = checked;
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setUpdateOnLibraryLoading(false);
      });
  };

  useEffect(() => {
    // fetch api only if id is a number
    if (id != null && !isNaN(+id)) {
      getMovieDetailsApi(id)
        .then((data) => {
          setErrorMessage(null);
          setMovie(data.movie);
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  }, []);

  if (movie != null) {
    return (
      <>
        {movie.backdrop_path != null &&
          <div
            className='Header-image'
            style={{
              backgroundImage: `url("${env.MOVIEDB_IMAGESPATH}/${movie.backdrop_path}")`
            }}
          ></div>
        }

        <ErrorMessage message={errorMessage}></ErrorMessage>

        <h1>{movie.title}</h1>
        <h2 style={{ color: 'gray', marginTop: -15 }}>
          {movie.original_title} ({movie.original_language.toUpperCase()})
        </h2>

        <div style={{ marginTop: 25, marginBottom: 35 }}>
          {movie.release_date !== '' &&
            <Tooltip title='Release date'>
              <Chip icon={<TodayIcon />} label={new Date(movie.release_date).getFullYear()} variant="outlined" sx={{ m: 0.5 }} />
            </Tooltip>
          }

          <Tooltip title='Status'>
            <Chip label={movie.status} variant="outlined" sx={{ m: 0.5 }} />
          </Tooltip>

          {movie.budget > 0 &&
            <Tooltip title={`Budget (${movie.budget} $)`}>
              <Chip icon={<AttachMoneyIcon />} label={movie.budget_format} variant="outlined" sx={{ m: 0.5 }} />
            </Tooltip>
          }

          {movie.revenue > 0 &&
            <Tooltip title={`Revenues (${movie.revenue} $)`}>
              <Chip icon={<RedeemIcon />} label={movie.revenue_format} variant="outlined" sx={{ m: 0.5 }} />
            </Tooltip>
          }

          <Tooltip title={`${movie.vote_count} votes`}>
            <Chip icon={<ThumbUpIcon />} label={`${movie.vote_average}/10`} variant="outlined" sx={{ m: 0.5 }} />
          </Tooltip>

          <Tooltip title={`${movie.on_my_library ? 'Uns' : 'S'}ave on your library ?`}>
            <Checkbox
              {...label}
              disabled={updateOnLibraryLoading}
              checked={movie.on_my_library}
              onChange={onSavedOnLibraryChange}
              icon={<BookmarkBorderIcon />}
              checkedIcon={<BookmarkIcon />}
            />
          </Tooltip>
        </div>

        <p style={{ marginBottom: 50 }}>{movie.overview}</p>

        <MovieHoverRating />

        {movie.homepage !== '' &&
          <Button variant="contained" href={movie.homepage} target='_blank'>
            <LanguageIcon />Go to homepage
          </Button>
        }
      </>
    );
  } else {
    return (<ErrorMessage message="Movie not found"></ErrorMessage>)
  }
};

export default Movie;
