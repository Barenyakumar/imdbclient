// src/features/movies/EditMovie.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovies, updateMovie } from './moviesSlice';

const EditMovie = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: movies, status } = useSelector(state => state.movies);

  const [movieData, setMovieData] = useState({
    name: '',
    yearOfRelease: '',
    plot: '',
    poster: '',
    producer: '',
    actors: []
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMovies());
    }
  }, [status, dispatch]);

  useEffect(() => {
    const movie = movies.find(m => m._id === movieId);
    if (movie) {
      setMovieData({
        name: movie.name,
        yearOfRelease: movie.yearOfRelease,
        plot: movie.plot,
        poster: movie.poster || '',
        producer: movie.producer?._id || '',
        actors: movie.actors?.map(a => a._id) || []
      });
    }
  }, [movies, movieId]);

  const handleChange = (e) => {
    setMovieData({ ...movieData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateMovie({ movieId, updatedData: movieData }));
    navigate('/');
  };

  return (
    <div>
      <h2>Edit Movie</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Movie Name:</label>
          <input 
            type="text"
            name="name"
            value={movieData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Year of Release:</label>
          <input
            type="number"
            name="yearOfRelease"
            value={movieData.yearOfRelease}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Plot:</label>
          <textarea
            name="plot"
            value={movieData.plot}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Poster URL:</label>
          <input
            type="text"
            name="poster"
            value={movieData.poster}
            onChange={handleChange}
          />
        </div>
        {/* Additional fields for producer and actors can be added here */}
        <button type="submit">Update Movie</button>
      </form>
    </div>
  );
};

export default EditMovie;
