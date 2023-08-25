/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState, type ReactElement, type SyntheticEvent } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Autocomplete, type AutocompleteInputChangeReason, TextField } from '@mui/material';
import MovieCard from '../components/MovieCard';

const Home = (): ReactElement => {
  const [options, setOptions] = useState([]);

  const getData = (searchTerm: string): void => {
    // fetch api
  };

  const onInputChange = (event: SyntheticEvent, value: string, reason: AutocompleteInputChangeReason): void => {
    if (value) {
      getData(value);
    } else {
      setOptions([]);
    }
  };
  return (
    <Box
      sx={{ flexGrow: 1 }}
      style={{
        paddingTop: '50px'
      }}
    >
      <Autocomplete
        id='combo-box-demo'
        options={options}
        onInputChange={onInputChange}
        getOptionLabel={(option: { title: string }) => option.title}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label='Search film' variant='outlined' />
        )}
      />
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {Array.from(Array(7)).map((_, index) => (
          <Grid xs={2} sm={4} md={4} key={index}>
            <MovieCard></MovieCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
