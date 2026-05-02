import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import api from '../services/api';

const Home = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/eventos')
      .then(res => {
        setEventos(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleInscricao = async (eventoId) => {
    const participanteId = prompt("Digite seu ID de participante:");
    if (!participanteId) return;

    try {
      await api.post('/inscricoes', { eventoId, participanteId });
      alert("Inscrição realizada com sucesso!");
    } catch (err) {
      alert("Erro ao se inscrever. Verifique se o seu ID existe.");
    }
  };

  if (loading) return <Container className="text-center mt-5"><Spinner animation="border" /></Container>;

  return (
    <Container>
      <h2 className="mb-4"><i className="bi bi-calendar-event"></i> Eventos Disponíveis</h2>
      <Row>
        {eventos.length === 0 && <Alert variant="info">Nenhum evento encontrado.</Alert>}
        {eventos.map(evento => (
          <Col md={4} key={evento.id} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{evento.nome}</Card.Title>
                <Card.Text>
                  <strong>Data:</strong> {new Date(evento.data).toLocaleDateString()}<br/>
                  <strong>Local:</strong> {evento.local}<br/>
                  <small className="text-muted">Palestrante: {evento.Palestrante?.nome || 'N/A'}</small>
                </Card.Text>
                <Button variant="primary" onClick={() => handleInscricao(evento.id)}>
                  Inscrever-se
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;