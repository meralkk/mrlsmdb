import React, { useEffect, useState } from "react";
import { Carousel, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios"; // Axios kütüphanesini içe aktarın
import { AiFillStar } from "react-icons/ai";
import "./popular.scss";
import MainTitle from "../main-title/main-title";

function Slider() {
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
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
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
      console.log(movieData);
    };

    // Sayfa yüklendiğinde verileri çekme işlemi başlatılır
    loadData();
  }, []);

  // Bir diziyi belirtilen boyutlarda alt dizilere bölmek için bir fonksiyon
  const chunkArray = (arr, chunkSize) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  };

  // Filmleri 4'ü 4'e bölen bir dizi oluşturma
  const movieChunks = chunkArray(movieData, 4);

  return (
    <Container className="tvseries-bg">
      <MainTitle title="Populer Movies" />

      <Carousel>
        {movieChunks.map((moviesInRow, index) => (
          <Carousel.Item key={index}>
            <Row>
              {moviesInRow.map((movie, subIndex) => (
                <Col key={subIndex}>
                  {/* Film detaylarına bağlantı sağlayan kartlar */}
                  <Card className="carousel-card">
                    <Link to={`/movie-detail/${movie.id}`}>
                      <Card.Img
                        variant="top"
                        src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                        alt={movie.title}
                      />
                      <div className="card-body">
                        <div className="popular-title">{movie.title}</div>
                        <div className="average">
                          {" "}
                          <AiFillStar /> {movie.vote_average}
                        </div>
                      </div>
                    </Link>
                  </Card>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}

export default Slider;
