import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Table, Button, Badge, Spinner } from 'react-bootstrap';
import api from '../services/api';

const DetalhesEvento = () => {
  const { id } = useParams(); // Pega o ID do evento da URL
  const [evento, setEvento] = useState(null);
  const [inscritos, setInscritos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        // Busca os inscritos (a rota que configuramos no backend)
        const response = await api.get(`/eventos/${id}/inscricoes`);
        setInscritos(response.data);
        
        // Opcional: Busca dados do evento para mostrar o título na tela
        const resEvento = await api.get('/eventos');
        const atual = resEvento.data.find(e => e.id === Number(id));
        setEvento(atual);
        
        setLoading(false);
      } catch (err) {
        console.error("Erro ao carregar detalhes:", err);
        setLoading(false);
      }
    }
    carregarDados();
  }, [id]);

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <Container>
      <Link to="/" className="btn btn-secondary mb-3">Voltar</Link>
      
      <div className="bg-light p-4 rounded mb-4">
        <h2>{evento?.titulo}</h2>
        <p><strong>Local:</strong> {evento?.local}</p>
        <p><strong>Data:</strong> {new Date(evento?.data).toLocaleDateString()}</p>
      </div>

      <h4>Participantes Inscritos ({inscritos.length})</h4>
      
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>Nome do Participante</th>
            <th>Status de Pagamento</th>
          </tr>
        </thead>
        <tbody>
          {inscritos.length > 0 ? (
            inscritos.map(ins => (
              <tr key={ins.id}>
                {}
                <td>{ins.Participante?.nome || `ID do Participante: ${ins.participanteId}`}</td>
                <td>
                  {ins.pago ? 
                    <Badge bg="success">Pago</Badge> : 
                    <Badge bg="warning" text="dark">Pendente</Badge>
                  }
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center">Ninguém se inscreveu neste evento ainda.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default DetalhesEvento;