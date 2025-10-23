import React, { Component } from 'react';
import { Card, Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faSave, faUndo, faEdit, faCar, faPalette, faCalendarAlt, faTag, faIdCard } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './MyToast';
import { useParams, useNavigate } from 'react-router-dom';

class Voiture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      marque: '',
      modele: '',
      couleur: '',
      immatricule: '',
      annee: '',
      prix: '',
      show: false,
      loading: false,
      message: '',
      type: 'success'
    };
  }

  componentDidMount() {
    const voitureId = this.props.params.id;
    if (voitureId) {
      this.findVoitureById(voitureId);
    }
  }

  findVoitureById = (voitureId) => {
    this.setState({ loading: true });
    console.log('Fetching voiture with ID:', voitureId);
    axios.get("http://localhost:8080/api/voitures/" + voitureId)
      .then(response => {
        console.log('Voiture data received:', response.data);
        if (response.data != null) {
          this.setState({
            id: response.data.id || voitureId,
            marque: response.data.marque,
            modele: response.data.modele,
            couleur: response.data.couleur,
            immatricule: response.data.immatricule,
            annee: response.data.annee,
            prix: response.data.prix,
            loading: false
          });
        }
      })
      .catch(error => {
        console.error('Error fetching voiture:', error);
        this.setState({
          loading: false,
          show: true,
          message: "Erreur lors du chargement de la voiture",
          type: "danger"
        });
        setTimeout(() => this.setState({ show: false }), 3000);
      });
  };

  voitureChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitVoiture = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    const voiture = {
      marque: this.state.marque,
      modele: this.state.modele,
      couleur: this.state.couleur,
      immatricule: this.state.immatricule,
      annee: parseInt(this.state.annee),
      prix: parseInt(this.state.prix)
    };

    if (this.state.id) {
      // Modification
      axios.put("http://localhost:8080/api/voitures/" + this.state.id, voiture)
        .then(response => {
          if (response.data != null) {
            this.setState({
              show: true,
              loading: false,
              message: "Voiture modifiée avec succès",
              type: "success"
            });
            setTimeout(() => {
              this.setState({ show: false });
              this.props.navigate('/list');
            }, 2000);
          }
        })
        .catch(error => {
          console.error('Error updating voiture:', error);
          this.setState({
            loading: false,
            show: true,
            message: "Erreur lors de la modification",
            type: "danger"
          });
          setTimeout(() => this.setState({ show: false }), 3000);
        });
    } else {
      // Ajout
      axios.post("http://localhost:8080/api/voitures", voiture)
        .then(response => {
          if (response.data != null) {
            this.setState({
              show: true,
              loading: false,
              message: "Voiture ajoutée avec succès",
              type: "success"
            });
            setTimeout(() => {
              this.setState({ show: false });
              this.resetVoiture();
            }, 2000);
          }
        })
        .catch(error => {
          console.error('Error creating voiture:', error);
          this.setState({
            loading: false,
            show: true,
            message: "Erreur lors de l'ajout",
            type: "danger"
          });
          setTimeout(() => this.setState({ show: false }), 3000);
        });
    }
  };

  resetVoiture = () => {
    this.setState({
      id: '',
      marque: '',
      modele: '',
      couleur: '',
      immatricule: '',
      annee: '',
      prix: ''
    });
  };

  render() {
    const { marque, modele, couleur, immatricule, annee, prix, loading, show, message, type } = this.state;
    const isEdit = !!this.state.id;

    return (
      <div>
        {show && (
          <MyToast children={{ show, message, type }} />
        )}

        <Card className="modern-card border-0">
          <Card.Header className="modern-card-header">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={isEdit ? faEdit : faPlusSquare} className="me-3" />
              <div>
                <h4 className="mb-0">
                  {isEdit ? "Modifier la Voiture" : "Ajouter une Voiture"}
                </h4>
                <small className="opacity-75">
                  {isEdit ? "Modifiez les informations de la voiture" : "Remplissez les informations de la nouvelle voiture"}
                </small>
              </div>
            </div>
          </Card.Header>

          <Card.Body className="modern-card-body">
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" size="lg" />
                <p className="mt-3 text-muted">
                  {isEdit ? "Chargement de la voiture..." : "Enregistrement en cours..."}
                </p>
              </div>
            ) : (
              <Form onSubmit={this.submitVoiture} onReset={this.resetVoiture} className="form-modern">
                <Row className="g-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>
                        <FontAwesomeIcon icon={faCar} className="me-2 text-primary" />
                        Marque *
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="marque"
                        value={marque}
                        onChange={this.voitureChange}
                        placeholder="Ex: Toyota, BMW, Mercedes..."
                        autoComplete="off"
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>
                        <FontAwesomeIcon icon={faCar} className="me-2 text-primary" />
                        Modèle *
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="modele"
                        value={modele}
                        onChange={this.voitureChange}
                        placeholder="Ex: Corolla, X5, C-Class..."
                        autoComplete="off"
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>
                        <FontAwesomeIcon icon={faPalette} className="me-2 text-primary" />
                        Couleur *
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="couleur"
                        value={couleur}
                        onChange={this.voitureChange}
                        placeholder="Ex: Rouge, Bleu, Blanc..."
                        autoComplete="off"
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>
                        <FontAwesomeIcon icon={faIdCard} className="me-2 text-primary" />
                        Immatriculation *
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="immatricule"
                        value={immatricule}
                        onChange={this.voitureChange}
                        placeholder="Ex: AB-123-CD"
                        autoComplete="off"
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>
                        <FontAwesomeIcon icon={faCalendarAlt} className="me-2 text-primary" />
                        Année *
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="annee"
                        value={annee}
                        onChange={this.voitureChange}
                        placeholder="Ex: 2020"
                        min="1900"
                        max={new Date().getFullYear() + 1}
                        autoComplete="off"
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>
                        <FontAwesomeIcon icon={faTag} className="me-2 text-primary" />
                        Prix (€) *
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="prix"
                        value={prix}
                        onChange={this.voitureChange}
                        placeholder="Ex: 25000"
                        min="0"
                        step="100"
                        autoComplete="off"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex gap-3 justify-content-end mt-4">
                  <Button
                    variant="outline-secondary"
                    type="reset"
                    className="btn-outline-modern"
                    disabled={loading}
                  >
                    <FontAwesomeIcon icon={faUndo} className="me-2" />
                    Réinitialiser
                  </Button>
                  <Button
                    variant="success"
                    type="submit"
                    className="btn-modern"
                    disabled={loading}
                  >
                    <FontAwesomeIcon icon={faSave} className="me-2" />
                    {isEdit ? "Modifier" : "Ajouter"}
                  </Button>
                </div>
              </Form>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default function VoitureWrapper(props) {
  const params = useParams();
  const navigate = useNavigate();
  return <Voiture {...props} params={params} navigate={navigate} />;
}