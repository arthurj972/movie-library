import React, { type SyntheticEvent, type FC } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import env from 'react-dotenv';

const labels: Record<string, string> = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+'
};

const getLabelText = (value: number): string => {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

interface MovieHoverRatingProps {
  rate: number
  moviedbId: string
}

const MovieHoverRating: FC<MovieHoverRatingProps> = ({ rate, moviedbId }): JSX.Element => {
  const [value, setValue] = React.useState<number | null>(rate);
  const [hover, setHover] = React.useState(-1);

  const rateMovie = async (value: number): Promise<void> => {
    return await fetch(`${env.API_URL}/my-library/movie/${moviedbId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        rate: value
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

  const onChange = (event: SyntheticEvent, value: number | null): void => {
    console.log('value :>> ', value);
    if (value != null) {
      rateMovie(value)
        .then((data) => {
          // setErrorMessage(null);
          setValue(value);
        })
        .catch((error) => {
          // setErrorMessage(error.message);
          console.log(error);
        });
    }
  }

  return (
    <>
      <p style={{ fontWeight: 'bolder' }}>What do you think about it ?</p>

      <Box
        sx={{
          width: 200,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Rating
          name="hover-feedback"
          value={value}
          precision={0.5}
          getLabelText={getLabelText}
          onChange={onChange}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {value !== null && (
          <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
        )}
      </Box>
    </>
  );
}

export default MovieHoverRating;
