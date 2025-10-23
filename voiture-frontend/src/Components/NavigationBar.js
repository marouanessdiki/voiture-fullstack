import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faPlus, faList, faHome } from '@fortawesome/free-solid-svg-icons';

const NavigationBar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Navbar expand="lg" fixed="top" className="navbar-modern">
      <Container>
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <div className="me-3">
            <FontAwesomeIcon
              icon={faCar}
              style={{
                fontSize: '2rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            />
          </div>
          <span className="fw-bold">AutoShowroom</span>
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link
              to="/"
              className={`nav-link d-flex align-items-center ${isActive('/') ? 'active' : ''}`}
            >
              <FontAwesomeIcon icon={faHome} className="me-2" />
              Accueil
            </Link>
            <Link
              to="/add"
              className={`nav-link d-flex align-items-center ${isActive('/add') ? 'active' : ''}`}
            >
              <FontAwesomeIcon icon={faPlus} className="me-2" />
              Ajouter Voiture
            </Link>
            <Link
              to="/list"
              className={`nav-link d-flex align-items-center ${isActive('/list') ? 'active' : ''}`}
            >
              <FontAwesomeIcon icon={faList} className="me-2" />
              Liste Voitures
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;