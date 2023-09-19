import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { AiFillStar } from "react-icons/ai";
import { TbLayoutList } from "react-icons/tb";
import ViewDayRoundedIcon from "@mui/icons-material/ViewDayRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";

import "./tvseries-menu.scss";
import MainTitle from "../main-title/main-title";
import PaginationComponent from "../pagination/pagination-component";

function TvSeriesMenu() {
  // TV dizisi verilerini depolamak için state kullanılır
  const [tvSeriesData, setTvSeriesData] = useState([]);

  //Pagination için
  const [currentPage, setCurrentPage] = useState(1); // Mevcut sayfa numarası
  const [totalPages, setTotalPages] = useState(0);

  //Card ve List yapısı için
  const [isCardView, setIsCardView] = useState(true);
  const [isListView, setIsListView] = useState(false);

  // Sayfa numarasını değiştiren işlev
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    // Verileri çekmek için asenkron bir fonksiyon kullanılır
    const loadData = async () => {
      const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
      const apiToken = import.meta.env.VITE_REACT_APP_API_TOKEN;

      try {
        // Axios ile API'den verileri getirme
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${currentPage}`, // Sayfa numarasını değiştirdik
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${apiToken}`,
            },
          }
        );

        // Başarılı bir yanıt durumunda verileri güncelleme
        if (response.status === 200) {
          setTvSeriesData(response.data.results);
          setTotalPages(response.data.total_pages); // Toplam sayfa sayısını güncelliyoruz
        } else {
          console.error("API Request Error:", response.statusText);
        }
      } catch (error) {
        console.error("API Request Error:", error);
      }
    };

    // Sayfa yüklendiğinde verileri çekme işlemi başlatılıyor
    loadData();
  }, [currentPage]); // currentPage bağımlılığını ekledik, bu şekilde sayfa numarası değiştikçe useEffect yeniden çalışacak

  return (
    <Container className="tvseries-bg">
      <div className="header">
        <div className="header-title">TV Series</div>
        <div className="view-toggle">
          <button
            className="button-view"
            onClick={() => {
              setIsCardView(true);
              setIsListView(false);
            }}
          >
            <GridViewRoundedIcon />
          </button>
          <button
            className="button-view"
            onClick={() => {
              setIsCardView(false);
              setIsListView(true);
            }}
          >
            <ViewDayRoundedIcon />
          </button>
        </div>
      </div>

      {isCardView && ( // Eğer card seçtiyse
        <Row>
          {tvSeriesData.map((tvSeries) => (
            <Col key={tvSeries.id} sm={12} md={6} lg={4} xl={3}>
              <Card className="movie-card">
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w200/${tvSeries.poster_path}`}
                  alt={tvSeries.title}
                />

                <div className="title">{tvSeries.name}</div>
                <div className="release-date">
                  {parseFloat(tvSeries.first_air_date).toFixed(0)}
                </div>
                <div className="average">
                  <AiFillStar /> {parseFloat(tvSeries.vote_average).toFixed(1)}{" "}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      {isListView && (
        <Container>
          {tvSeriesData.map((tvSeries) => (
            <Col className="list-container" key={tvSeries.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200/${tvSeries.poster_path}`}
                alt={tvSeries.name}
                className="list-poster"
              />
              <Col className="list-title">{tvSeries.name}</Col>
              <Col className="list-release-date">
                {parseFloat(tvSeries.first_air_date).toFixed(0)}
              </Col>
              <Col className="list-average">
                <AiFillStar /> {parseFloat(tvSeries.vote_average).toFixed(1)}
              </Col>
            </Col>
          ))}
        </Container>
      )}
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Container>
  );
}

export default TvSeriesMenu;
