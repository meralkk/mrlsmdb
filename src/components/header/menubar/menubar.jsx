import React, { useState } from 'react';
import { Container, Nav, Navbar, Form, Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './menubar.scss';
import axios from 'axios';
import { AiFillStar } from "react-icons/Ai";
import MainTitle from "../../main-title/main-title";
import PaginationComponent from "../../pagination/pagination-component";

function Menubar({ setShowOtherComponents }) {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    handleSearch(newPage); // Sayfa değiştiğinde yeni verileri çekmek için handleSearch işlemini çağırın
  };

  const handleSearch = async (page = 1) => { // Sayfa numarasını parametre olarak alın
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${searchText}&include_adult=false&page=${page}`
      );
      setSearchResults(response.data.results);
      setShowOtherComponents(false);
      setTotalPages(response.data.total_pages);

    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearch(); // Sayfa numarasını belirtmeden çağırarak ilk sayfayı getirin
  };

  const handleClearSearch = () => {
    setSearchText('');
    setSearchResults([]);
    setShowOtherComponents(true);
  };

  return (
    <>
      <Navbar className="navbar">
        <Container>
          <Navbar.Brand as={Link} to="/" onClick={handleClearSearch}>
            MRL 's MDb
          </Navbar.Brand>

          <Form className="d-flex" onSubmit={handleFormSubmit}>
            <Form.Control
              type="search"
              placeholder="Search MRL's MDB"
              className="me-2"
              aria-label="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onClick={handleClearSearch}
            />
            <Button className="button" type="submit">
              Search
            </Button>
          </Form>

          <Nav className="links">
            <Nav.Link as={Link} to="/movies">
              Movies
            </Nav.Link>
          </Nav>
          <Nav className="links">
            <Nav.Link as={Link} to="/tv-series">
              TV Series
            </Nav.Link>
          </Nav>
          <Nav className="links">
            <Nav.Link as={Link} to="/celebs">
              Celebs
            </Nav.Link>
          
          </Nav>
          <Nav className="links">
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {searchResults.length > 0 && (
        <div className="search-results">
          <Container className="tvseries-bg">
            <MainTitle title="Search Results" />
            <Row>
              {searchResults.map((result) => (
                <Col key={result.id} sm={12} md={6} lg={4} xl={3}>
                  <Card className="movie-card">
                    {result.poster_path ? (
                      <Card.Img
                      style={{
                        height: '450px', // Yüksekliği ayarlayın
                        objectFit: 'cover', // Resmi ölçeklendirin ve sığdırın
                      }}
                      variant="top"
                      src={`https://image.tmdb.org/t/p/w200/${result.poster_path}`}
                      alt={result.title || result.name}
                    />
                    
                    ) : (
                      <Card.Img
                        variant="top"
                        src="../../../../public/img/no-image.jpg"
                        alt="No Image"
                      />
                    )}
                    <Card.Title className="title">
                      {result.title || result.name}
                    </Card.Title>
                    <Card.Text className="release-date">
                      {parseFloat(result.release_date).toFixed(0)}
                    </Card.Text>
                    <Card.Text className="average">
                      <AiFillStar />
                      {parseFloat(result.vote_average).toFixed(1)}
                    </Card.Text>
                  </Card>
                </Col>
              ))}
            </Row>
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Container>
        </div>
      )}
    </>
  );
}

export default Menubar;
