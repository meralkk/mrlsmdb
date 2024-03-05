import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import GradeIcon from '@mui/icons-material/Grade';
import { Link } from 'react-router-dom'; // Import Link from React Router
import "./all-movies.scss";
import MainTitle from "../main-title/main-title";
import PaginationComponent from "../pagination/pagination-component";

function AllMovies() {
  const [movieData, setMovieData] = useState([]);
  const [page, setPage] = useState(1);
  const totalPages = 20;

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const loadData = async () => {
      const apiToken = import.meta.env.VITE_REACT_APP_API_TOKEN;

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${apiToken}`,
            },
          }
        );

        if (response.status === 200) {
          setMovieData(response.data.results);
        } else {
          console.error("API Request Error:", response.statusText);
        }
      } catch (error) {
        console.error("API Request Error:", error);
      }
    };

    loadData();
  }, [page]);

  return (
    <Container className="tvseries-bg">
      <MainTitle title="Trend Movies" />

      <Row>
        {movieData.map((movie) => (
          <Col key={movie.id} sm={12} md={6} lg={4} xl={3}>
            {/* Wrap Card.Img with Link */}
            <Link to={`/movie-detail/${movie.id}`} className="movie-link">
              <Card className="movie-card">
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className="title">{movie.title}</div>
                <div className="release-date">
                  {parseFloat(movie.release_date).toFixed(0)}
                </div>
                <div className="average">
                  <GradeIcon /> {parseFloat(movie.vote_average).toFixed(1)}{" "}
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      <PaginationComponent
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Container>
  );
}

export default AllMovies;
