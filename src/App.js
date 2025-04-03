// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './features/movies/MovieList';
import AddMovie from './features/movies/AddMovie';
import EditMovie from './features/movies/EditMovie';

function App() {
  return (
    <Router>
      <div>
        <h1>IMDB Clone</h1>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/add-movie" element={<AddMovie />} />
          <Route path="/edit-movie/:movieId" element={<EditMovie />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
