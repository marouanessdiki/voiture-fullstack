import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Bienvenue = () => {
  return (
    <div>
      <Card className="modern-card border-0">
        <div className="welcome-hero">
          <h1>Bienvenue chez AutoShowroom</h1>
          <p className="lead">Découvrez notre collection exceptionnelle de véhicules d'occasion et neufs</p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/add">
              <Button variant="light" size="lg" className="btn-modern">
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                Ajouter une Voiture
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Bienvenue;