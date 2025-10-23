import React from 'react';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faEnvelope, faPhone, faMapMarkerAlt, faHeart } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const fullYear = new Date().getFullYear();

  return (
    <Navbar fixed="bottom" className="footer-modern">
      <Container>
        <Row className="w-100 align-items-center">
          <Col md={6} className="text-center text-md-start">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start">
              <FontAwesomeIcon icon={faCar} className="me-2 text-primary" />
              <span className="fw-bold">AutoShowroom</span>
            </div>
            <small className="text-muted">
              Votre partenaire de confiance pour l'achat de véhicules
            </small>
          </Col>

          <Col md={6} className="text-center text-md-end mt-2 mt-md-0">
            <div className="d-flex justify-content-center justify-content-md-end align-items-center">
              <small className="text-muted me-2">
                Fait avec
              </small>
              <FontAwesomeIcon icon={faHeart} className="text-danger me-2" />
              <small className="text-muted">
                © {fullYear} AutoShowroom. Tous droits réservés.
              </small>
            </div>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default Footer;