import React, { Component } from 'react';
import { Card, Table, Button, ButtonGroup, Row, Col, Badge, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faEdit, faTrash, faCar, faCalendarAlt, faTag, faPalette } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './MyToast';
import { Link } from 'react-router-dom';

export default class VoitureListe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voitures: [],
      show: false,
      loading: true,
      message: '',
      type: 'success'
    };
  }

  componentDidMount() {
    this.fetchVoitures();
  }

  fetchVoitures = () => {
    this.setState({ loading: true });
    axios.get("http://localhost:8080/api/voitures")
      .then(response => {
        console.log('API Response:', response.data);
        // Handle Spring Data REST HAL format
        let voitures = [];
        if (response.data) {
          if (Array.isArray(response.data)) {
            voitures = response.data;
          } else if (response.data._embedded && response.data._embedded.voitures) {
            voitures = response.data._embedded.voitures;
            // Add a unique ID to each voiture for reliable tracking
            voitures = voitures.map((voiture, index) => ({
              ...voiture,
              _uniqueId: `voiture_${Date.now()}_${index}` // Unique ID that won't change
            }));
          } else if (response.data.content) {
            voitures = response.data.content;
          }
        }
        console.log('Processed voitures:', voitures);
        this.setState({ voitures: voitures, loading: false });
      })
      .catch(error => {
        console.error('Error fetching voitures:', error);
        this.setState({
          loading: false,
          show: true,
          message: "Erreur lors du chargement des voitures",
          type: "danger"
        });
        setTimeout(() => this.setState({ show: false }), 3000);
      });
  }

  deleteVoiture = (voitureId) => {
    console.log('Attempting to delete voiture with ID:', voitureId);
    if (!voitureId) {
      console.error('Voiture ID is undefined or null');
      this.setState({
        show: true,
        message: "Erreur: ID de voiture manquant",
        type: "danger"
      });
      setTimeout(() => this.setState({ show: false }), 3000);
      return;
    }

    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette voiture ?')) {
      // Find the voiture object using the unique ID
      const voiture = this.state.voitures.find(v => v._uniqueId === voitureId);
      let actualVoitureId = null;

      if (voiture) {
        // Try different ID fields
        actualVoitureId = voiture.id || voiture.ID || voiture._id;

        // If still no ID, try to extract from _links.self.href
        if (!actualVoitureId && voiture._links && voiture._links.self && voiture._links.self.href) {
          const href = voiture._links.self.href;
          const idMatch = href.match(/\/(\d+)$/);
          if (idMatch) {
            actualVoitureId = idMatch[1];
          }
        }
      }

      console.log('Using actual ID for deletion:', actualVoitureId);

      if (!actualVoitureId) {
        this.setState({
          show: true,
          message: "Erreur: Impossible de trouver l'ID de la voiture",
          type: "danger"
        });
        setTimeout(() => this.setState({ show: false }), 3000);
        return;
      }

      axios.delete("http://localhost:8080/api/voitures/" + actualVoitureId)
        .then(response => {
          console.log('Delete successful:', response);
          // Update the voitures list by filtering out the deleted item using unique ID
          this.setState(prevState => ({
            voitures: prevState.voitures.filter(v => v._uniqueId !== voitureId),
            show: true,
            message: "Voiture supprimée avec succès",
            type: "success"
          }));
          setTimeout(() => this.setState({ show: false }), 3000);
        })
        .catch(error => {
          console.error('Error deleting voiture:', error);
          this.setState({
            show: true,
            message: "Erreur lors de la suppression",
            type: "danger"
          });
          setTimeout(() => this.setState({ show: false }), 3000);
        });
    }
  };

  handleEditClick = (voitureId) => {
    console.log('Edit clicked for voiture ID:', voitureId);
    const voiture = this.state.voitures.find(v => v._uniqueId === voitureId);
    if (voiture) {
      // Store the voiture data for editing
      let actualVoitureId = voiture.id || voiture.ID || voiture._id;
      if (voiture._links && voiture._links.self && voiture._links.self.href) {
        const href = voiture._links.self.href;
        const idMatch = href.match(/\/(\d+)$/);
        if (idMatch) {
          actualVoitureId = idMatch[1];
        }
      }
      console.log('Actual ID for editing:', actualVoitureId);
    }
  };

  getActualId = (voiture) => {
    // Try different ID fields
    let actualId = voiture.id || voiture.ID || voiture._id;

    // If still no ID, try to extract from _links.self.href
    if (!actualId && voiture._links && voiture._links.self && voiture._links.self.href) {
      const href = voiture._links.self.href;
      const idMatch = href.match(/\/(\d+)$/);
      if (idMatch) {
        actualId = idMatch[1];
      }
    }

    return actualId || 'unknown';
  };

  formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  getYearColor = (year) => {
    const currentYear = new Date().getFullYear();
    const age = currentYear - year;
    if (age <= 2) return 'success';
    if (age <= 5) return 'warning';
    return 'secondary';
  };

  render() {
    const { voitures, loading, show, message, type } = this.state;
    const voituresList = Array.isArray(voitures) ? voitures : [];

    return (
      <div>
        {show && (
          <MyToast children={{ show, message, type }} />
        )}

        <Card className="modern-card border-0">
          <Card.Header className="modern-card-header">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faList} className="me-3" />
              <div>
                <h4 className="mb-0">Collection de Voitures</h4>
                <small className="opacity-75">
                  {voituresList.length} véhicule{voituresList.length !== 1 ? 's' : ''} disponible{voituresList.length !== 1 ? 's' : ''}
                </small>
              </div>
            </div>
          </Card.Header>

          <Card.Body className="modern-card-body">
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" size="lg" />
                <p className="mt-3 text-muted">Chargement des voitures...</p>
              </div>
            ) : (
              <div className="table-responsive">
                <Table hover className="table-modern mb-0">
                  <thead>
                    <tr>
                      <th className="text-center">
                        <FontAwesomeIcon icon={faCar} className="me-2" />
                        Véhicule
                      </th>
                      <th>
                        <FontAwesomeIcon icon={faPalette} className="me-2" />
                        Couleur
                      </th>
                      <th className="text-center">
                        <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                        Année
                      </th>
                      <th className="text-end">
                        <FontAwesomeIcon icon={faTag} className="me-2" />
                        Prix
                      </th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {voituresList.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-5">
                          <FontAwesomeIcon
                            icon={faCar}
                            className="text-muted mb-3"
                            style={{ fontSize: '3rem' }}
                          />
                          <h5 className="text-muted">Aucune voiture disponible</h5>
                          <p className="text-muted">Commencez par ajouter votre première voiture !</p>
                          <Link to="/add">
                            <Button variant="primary" className="btn-modern">
                              <FontAwesomeIcon icon={faEdit} className="me-2" />
                              Ajouter une Voiture
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ) : (
                      voituresList.map((voiture, index) => {
                        console.log('Rendering voiture:', voiture);
                        // Use the _uniqueId field for reliable tracking
                        const voitureId = voiture._uniqueId || index;
                        console.log('Using voiture ID:', voitureId);
                        return (
                          <tr key={voitureId}>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="me-3">
                                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                                    style={{ width: '40px', height: '40px' }}>
                                    <FontAwesomeIcon icon={faCar} />
                                  </div>
                                </div>
                                <div>
                                  <h6 className="mb-1 fw-bold">{voiture.marque}</h6>
                                  <small className="text-muted">{voiture.modele}</small>
                                  {voiture.immatricule && (
                                    <div>
                                      <Badge bg="light" text="dark" className="small">
                                        {voiture.immatricule}
                                      </Badge>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td>
                              <Badge
                                bg="light"
                                text="dark"
                                className="px-3 py-2"
                                style={{
                                  backgroundColor: voiture.couleur.toLowerCase(),
                                  color: voiture.couleur.toLowerCase() === 'blanc' || voiture.couleur.toLowerCase() === 'jaune' ? '#000' : '#fff'
                                }}
                              >
                                {voiture.couleur}
                              </Badge>
                            </td>
                            <td className="text-center">
                              <Badge bg={this.getYearColor(voiture.annee)} className="px-3 py-2">
                                {voiture.annee}
                              </Badge>
                            </td>
                            <td className="text-end">
                              <h6 className="mb-0 fw-bold text-success">
                                {this.formatPrice(voiture.prix)}
                              </h6>
                            </td>
                            <td className="text-center">
                              <ButtonGroup size="sm">
                                <Link to={`/edit/${this.getActualId(voiture)}`} onClick={() => this.handleEditClick(voitureId)}>
                                  <Button variant="outline-primary" className="btn-modern">
                                    <FontAwesomeIcon icon={faEdit} />
                                  </Button>
                                </Link>
                                <Button
                                  variant="outline-danger"
                                  className="btn-modern"
                                  onClick={() => this.deleteVoiture(voitureId)}
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </Button>
                              </ButtonGroup>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </Table>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  }
}