import React, { type ReactElement } from 'react';
import { useParams } from 'react-router-dom';

const Movie = (): ReactElement => {
  const { id } = useParams();
  return (
    <div>
      <h1>Movie {id}</h1>
    </div>
  );
};

export default Movie;
