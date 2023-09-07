import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Routes ekleyin

// Sayfaları içe aktarın
import HomePage from './pages/home-page.jsx';
import MovieDetailPage from './pages/movie-detail-page.jsx';
import MoviesPage from './pages/movies-page.jsx';
import PeoplePage from './pages/people-page.jsx';
import TvSeriesPage from './pages/tv-series-page.jsx';

// Rotaları tanımlayın
const AppRoutes = () => {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<HomePage />} /> 
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movie-detail/:movieId" element={<MovieDetailPage />} />
        <Route path="/tv-series" element={<TvSeriesPage />} />
        <Route path="/people" element={<PeoplePage />} />


      </Routes>
    </Router>
  );
};

export default AppRoutes;
