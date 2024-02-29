import React from 'react';
import { Container, Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Navbar: React.FC = () => {
  const { user } = useAuth();

  return (
    <BootstrapNavbar bg="light" expand="lg">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">TaskTrade</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/add-task">Agregar Tarea</Nav.Link>
            <Nav.Link as={Link} to="/cart">Carrito</Nav.Link>
          </Nav>
          {user && (
            <Nav>
              <Nav.Link disabled>{user.username}</Nav.Link>
            </Nav>
          )}
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
