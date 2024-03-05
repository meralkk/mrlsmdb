import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import axios from "axios"; 
import GradeIcon from '@mui/icons-material/Grade';
import "./celebs.scss";
import MainTitle from '../main-title/main-title';

function People() {

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
          "https://api.themoviedb.org/3/trending/person/day?language=en-US",
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
            <MainTitle title="Celebs" />

      <Row>
        {movieData.map((movie) => (
          
          <Col key={movie.id} sm={12} md={6} lg={4} xl={3}>
            <Card className="movie-card">
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/w200/${movie.profile_path}`}
                alt={movie.title}
              />

                <div className="title">{movie.name}</div>
                <div className="release-date">{movie.known_for_department}</div>
                {/* <div className="average"><GradeIcon/>  {parseFloat(movie.popularity).toFixed(1)} </div> */}
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default People;
