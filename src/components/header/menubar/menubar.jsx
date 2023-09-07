import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './menubar.scss'


function Menubar() {
  
  return (
    <>
      <Navbar className='navbar'>
        <Container>
          <Navbar.Brand as={Link} to="/">MRL's MDB</Navbar.Brand>
          <Nav className="links">
            <Nav.Link as={Link} to="/movies" >Movies</Nav.Link>
          </Nav>
          <Nav className="links">
            <Nav.Link as={Link} to="/tv-series" >TV Series</Nav.Link>
          </Nav>
          <Nav className="links">
            <Nav.Link as={Link} to="/people" >People</Nav.Link>
          </Nav>

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search MRL's MDB"
              className="me-2"
              aria-label="Search"
            />
            <Button className='button'>Search</Button>
          </Form>
        </Container>
      </Navbar>

    </>
  );
}

export default Menubar;