import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Mi Aplicación</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/add-task">Agregar Tarea</Nav.Link>
            <Nav.Link as={Link} to="/cart">Carrito</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
            <Nav.Link as={Link} to="/register">Registrarse</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
