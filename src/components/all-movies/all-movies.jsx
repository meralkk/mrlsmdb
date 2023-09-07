import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import axios from "axios"; 
import { AiFillStar } from 'react-icons/ai';
import "./all-movies.scss";
import MainTitle from '../main-title/main-title';


function AllMovies() {
  // Film verilerini depolamak için state kullanılır
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    // Verileri çekmek için asenkron bir fonksiyon kullanılır
    const loadData = async () => {
      const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
      const apiToken = import.meta.env.VITE_REACT_APP_API_TOKEN;

      try {
        // Axios ile API'den verileri getirme
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/day?language=en-US', options",
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${apiToken}`,
            },
          }
        );

        // Başarılı bir yanıt durumunda verileri güncelleme
        if (response.status === 200) {
          setMovieData(response.data.results);
        } else {
          console.error("API Request Error:", response.statusText);
        }
      } catch (error) {
        console.error("API Request Error:", error);
      }
      console.log(movieData)
    };

    // Sayfa yüklendiğinde verileri çekme işlemi başlatılır
    loadData();
  }, []);

  return (
    <Container className="tvseries-bg">
            <MainTitle title="Trend Movies" />

      <Row>
        {movieData.map((movie) => (
          
          <Col key={movie.id} sm={12} md={6} lg={4} xl={3}>
            <Card className="movie-card">
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                alt={movie.title}
              />

                <div className="title">{movie.title}</div>
                <div className="release-date">{parseFloat(movie.release_date).toFixed(0)}</div>
                <div className="average"><AiFillStar/>  {parseFloat(movie.vote_average).toFixed(1)} </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default AllMovies;
