import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axiosInstance';

// Async thunk to fetch movies
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async () => {
    console.log("fetchMovies called");
    const response = await axios.get('/movies');
    console.log("fetchMovies response:", response);
    return response.data;
  }
);

// Async thunk to add a movie
export const addMovie = createAsyncThunk(
  'movies/addMovie',
  async (newMovie) => {
    const response = await axios.post('/movie', newMovie);
    return response.data;
  }
);

// Async thunk to update a movie
export const updateMovie = createAsyncThunk(
  'movies/updateMovie',
  async ({ movieId, updatedData }) => {
    const response = await axios.put(`/movie/${movieId}`, updatedData);
    return response.data;
  }
);

// Async thunk to delete a movie
export const deleteMovie = createAsyncThunk(
  'movies/deleteMovie',
  async (movieId) => {
    await axios.delete(`/movie/${movieId}`);
    return movieId;
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch movies
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add movie
      .addCase(addMovie.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Update movie
      .addCase(updateMovie.fulfilled, (state, action) => {
        const updatedMovie = action.payload;
        const index = state.items.findIndex(m => m._id === updatedMovie._id);
        if (index !== -1) {
          state.items[index] = updatedMovie;
        }
      })
      // Delete movie
      .addCase(deleteMovie.fulfilled, (state, action) => {
        const movieId = action.payload;
        state.items = state.items.filter(m => m._id !== movieId);
      });
  }
});

export default moviesSlice.reducer;
