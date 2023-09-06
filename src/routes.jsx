import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Routes ekleyin

// Sayfaları içe aktarın
import HomePage from './pages/home-page.jsx';
import MovieDetailPage from './pages/movie-detail-page.jsx';
import MoviesPage from './pages/movies-page.jsx';

// Rotaları tanımlayın
const AppRoutes = () => {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<HomePage />} /> 
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movie-detail/:movieId" element={<MovieDetailPage />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;
