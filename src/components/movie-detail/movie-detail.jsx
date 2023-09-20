import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { AiFillStar } from "../../../node_modules/react-icons/ai";
import './movie-detail.scss'

function MovieDetail() {
  const { movieId } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);

  useEffect(() => {
    // Movie detaylarını çekmek için asenkron bir fonksiyon kullanın
    const fetchMovieDetail = async () => {
      const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
      const apiToken = import.meta.env.VITE_REACT_APP_API_TOKEN;

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, 
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${apiToken}`,
            },
          }
        );

        if (response.status === 200) {
          setMovieDetail(response.data);
          console.log(response.data.genre_ids);
        } else {
          console.error("API Request Error:", response.statusText);
        }
      } catch (error) {
        console.error("API Request Error:", error);
      }

    };

    // Movie detaylarını çekme işlemini başlatın
    fetchMovieDetail();
  }, [movieId]);

  if (!movieDetail) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="movie-detail-container">
      <Row>
        <Col className="detail-img" md={3}>
          <img
            src={`https://image.tmdb.org/t/p/w300/${movieDetail.poster_path}`}
            alt={movieDetail.title}
            className="movie-poster"
          />
        </Col>
        <Col className="details" md={9}>
          <div className="title-rating">
          <div className="detail-title">{movieDetail.title}</div>
          <div className="rating"> <span>IMDb Rating</span>&nbsp;<AiFillStar/>&nbsp;{parseFloat(movieDetail.vote_average).toFixed(1)}</div>
          </div>
          <p className="movie-overview">{movieDetail.overview}</p>

          <div className="date">Release Date: {movieDetail.release_date}</div>
          <p className="language">Original Language: {movieDetail.original_language}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default MovieDetail;
