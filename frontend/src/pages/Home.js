import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import api from '../services/api';
import { Link } from 'react-router-dom';

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

  const handleInscricao = async (idDoEvento) => {
    const idDigitado = prompt("Digite o seu ID de participante para se inscrever:");

    if (!idDigitado) return; 

    try {
      const dados = {
        participanteId: Number(idDigitado),
        pago: false
      };

      await api.post(`/eventos/${idDoEvento}/inscricoes`, dados);

      alert("Inscrição realizada com sucesso!");
    } catch (err) {
      console.error("Erro detalhado:", err.response?.data);
      alert(err.response?.data?.error || "Erro ao se inscrever.");
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
                <Card.Title>{evento.titulo}</Card.Title>
                <Card.Text>
                  <strong>Data:</strong> {new Date(evento.data).toLocaleDateString()}<br />
                  <strong>Local:</strong> {evento.local}<br />
                  <small className="text-muted">Palestrante: {evento.Palestrante?.nome || 'N/A'}</small>
                </Card.Text>
                <div className="d-flex gap-2">
                  <Button variant="primary" onClick={() => handleInscricao(evento.id)}>
                    Inscrever-se
                  </Button>
                  <Link to={`/evento/${evento.id}`} className="btn btn-outline-info">
                    Ver Inscritos
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;