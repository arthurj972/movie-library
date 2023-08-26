import React, { type ReactElement } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

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

const MovieHoverRating = (): ReactElement => {
  const [value, setValue] = React.useState<number | null>(0);
  const [hover, setHover] = React.useState(-1);

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
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
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
