import React, { type FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Chip, Tooltip } from '@mui/material';
import env from 'react-dotenv';
import TodayIcon from '@mui/icons-material/Today';

import { type IMovie } from '../../models/movie.models';

interface MovieCardProps {
  movie: IMovie
}

const MovieCard: FC<MovieCardProps > = ({ movie }): JSX.Element => {
  return (
    <Card sx={{ maxWidth: 320 }}>
      <CardActionArea href={`/movie/${movie.moviedb_id}`} target="_blank">
        <CardMedia
          component="img"
          height="400"
          image={
            movie.poster_path !== null ? `${env.MOVIEDB_500_IMAGESPATH}/${movie.poster_path}` : '/no-movie-poster.jpg' }
          alt={`${movie.title} image`}
        />
        <CardContent style={{ height: 156 }}>
          <Tooltip title={movie.title}>
            <Typography aria-label={movie.title} gutterBottom variant="h5" component="div" style={{ height: 62 }} className='Ellipsis-3lines Ellipsis-2lines'>
              {movie.title}
            </Typography>
          </Tooltip>

          <Typography aria-label={movie.overview} variant="body2" color="text.secondary" className='Ellipsis-3lines'>
            {movie.overview}
          </Typography>

          <div style={{ marginTop: 10 }}>
            {movie.release_date !== undefined &&
              <Tooltip title='Release date'>
                <Chip icon={<TodayIcon />} label={new Date(movie.release_date).toDateString()} variant="outlined" size="small" sx={{ m: 0.5 }} />
              </Tooltip>
            }

            {movie.added_date !== undefined &&
              <Tooltip title='Added on library date'>
                <Chip icon={<TodayIcon />} label={new Date(movie.added_date).toDateString()} variant="outlined" size="small" sx={{ m: 0.5 }} />
              </Tooltip>
            }
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MovieCard;
