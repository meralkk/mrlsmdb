import React from "react";
import Footer from "./footer/footer";
import Menubar from "./header/menubar/menubar";
import Spacer from "./spacer/spacer";
import Popular from "./popular/popular";
import { Col, Container, Row } from "react-bootstrap";
import AllMovies from "./all-movies/all-movies";
import './home.scss'
import TvSeries from "./tv-series/tv-series";

function Home() {
  return (
    <div>
      <Menubar />
      <Popular />
      <Spacer />
      <Container>
        <Row>
          <Col md={9}>
            <AllMovies />
          </Col>
          <Col md={3}>
            <TvSeries />
          </Col>
        </Row>
      </Container>
      <Spacer />
      <Footer />
    </div>
  );
}

export default Home;
