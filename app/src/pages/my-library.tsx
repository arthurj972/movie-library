/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState, type ReactElement, type SyntheticEvent, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import {
  Autocomplete,
  type AutocompleteInputChangeReason,
  TextField,
  Button,
  Alert
} from '@mui/material';
import env from 'react-dotenv';
import SearchIcon from '@mui/icons-material/Search';

import MovieCard from '../components/MovieCard';
import ErrorMessage from '../components/ErrorMessage';
import { type IMovieResult, type IMovie } from '../models/movie.models';
import { getMoviesFromMovieDB } from '../services/moviedb.service';

const MyLibrary = (): ReactElement => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [options, setOptions] = useState([{ title: '', key: '' }]);
  const [searchName, setSearchName] = useState<string>('');
  const [movies, setMovies] = useState<IMovie[]>([]);

  const getMoviesFromLibrary = async (
    name: string
  ): Promise<IMovieResult> => {
    const additionalPath = name ? `/search/${name}` : '';
    return await fetch(`${env.API_URL}/my-library${additionalPath}`, {
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

  const getMoviesForAutocompleteInput = (name: string): void => {
    const controller = new AbortController();
    const signal = controller.signal;

    getMoviesFromMovieDB(name, signal)
      .then((data) => {
        setErrorMessage(null);
        const updatedOptions = [{ title: name, key: name }];

        // add new data on updatedOptions
        updatedOptions.push(...data.movies.map(movie => {
          return { title: movie.title, key: movie.moviedb_id.toString() };
        }));
        setOptions(updatedOptions);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const onSearchInputChange = (
    event: SyntheticEvent,
    value: string,
    reason: AutocompleteInputChangeReason
  ): void => {
    setSearchName(value);
    if (event.type === 'change') {
      // autocomplete only from 3 characters
      if (value && value.length > 2) {
        getMoviesForAutocompleteInput(value);
      } else {
        setOptions([{ title: value, key: value }]);
      }
    } else if (event.type === 'click') {
      showMovies(value);
    }
  };

  /**
   * Retrieves movies and displays on card
   * @param {string} name?:string
   * @returns {void}
   */
  const showMovies = (name?: string): void => {
    getMoviesFromLibrary(name ?? searchName)
      .then((data) => {
        setErrorMessage(null);
        setMovies(data.movies);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  useEffect(() => {
    showMovies();
  }, []);

  return (
    <Box
      sx={{ flexGrow: 1 }}
      style={{ marginTop: 50 }}
    >
      <h1>My Library</h1>

      <ErrorMessage message={errorMessage} />

      <Grid container spacing={2} style={{ marginTop: 10, marginBottom: 10 }}>
        <Grid xs={4}>
        <Autocomplete
          id='combo-box-demo'
          options={options}
          onInputChange={onSearchInputChange}
          getOptionLabel={(option: { title: string, key: string }) => option.title}
          renderInput={(params) => (
            <TextField {...params} label='Search film' variant='outlined' />
          )}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.key}>
                {option.title}
              </li>
            );
          }}
      />
        </Grid>
        <Grid xs={4}>
          <Button variant="contained" onClick={() => { showMovies() }} style={{ height: 56 }}>
            <SearchIcon />
          </Button>
        </Grid>
      </Grid>

      { movies.length === 0 &&
        <Alert severity="info">No movie found in your library. Try search on the homepage and adding it from movie details.</Alert>
      }

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {movies.map((movie, index) => (
          <Grid xs={2} sm={4} md={4} key={index}>
            <MovieCard movie={movie}></MovieCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyLibrary;
