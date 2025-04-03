// src/features/movies/MovieList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, deleteMovie } from './moviesSlice';
import { Link } from 'react-router-dom';

const MovieList = () => {
  const dispatch = useDispatch();
  const { items: movies, status, error } = useSelector(state => state.movies);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMovies());
    }
  }, [status, dispatch]);

  const handleDelete = (movieId) => {
    dispatch(deleteMovie(movieId));
  };

  if (status === 'loading') {
    return <p>Loading movies...</p>;
  }
  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Movies</h2>
      <Link to="/add-movie">Add New Movie</Link>
      <ul>
        {movies.map(movie => (
          <li key={movie._id}>
            <strong>{movie.name}</strong> ({movie.yearOfRelease}) <br />
            Producer: {movie.producer?.name} <br />
            Actors: {movie.actors?.map(a => a.name).join(', ')} <br />
            <Link to={`/edit-movie/${movie._id}`}>Edit</Link>
            {' | '}
            <button onClick={() => handleDelete(movie._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
