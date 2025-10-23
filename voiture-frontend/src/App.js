import React from 'react';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './Components/NavigationBar';
import Bienvenue from './Components/Bienvenue';
import Footer from './Components/Footer';
import Voiture from './Components/Voiture';
import VoitureListe from './Components/VoitureListe';

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavigationBar />
        <main className="main-content">
          <Container fluid className="px-4 py-4">
            <Row className="justify-content-center">
              <Col xl={10} lg={11} md={12}>
                <div className="fade-in">
                  <Routes>
                    <Route path="/" element={<Bienvenue />} />
                    <Route path="/add" element={<Voiture />} />
                    <Route path="/edit/:id" element={<Voiture />} />
                    <Route path="/list" element={<VoitureListe />} />
                  </Routes>
                </div>
              </Col>
            </Row>
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;