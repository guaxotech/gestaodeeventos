import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MyNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">Gestão de Eventos</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            
            {/* Menu Dropdown Administração */}
            <NavDropdown title="Gerenciar" id="admin-nav-dropdown">
              <NavDropdown.Item as={Link} to="/admin/eventos">Eventos</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/participantes">Participantes</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/palestrantes">Palestrantes</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/cadastro" className="btn btn-outline-light ms-lg-2">
               Quero Participar
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;