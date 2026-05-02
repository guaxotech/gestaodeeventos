import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import api from '../services/api';

const AdminParticipantes = () => {
  const [participantes, setParticipantes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPart, setCurrentPart] = useState({ id: '', nome: '', email: '' });

  const carregarParticipantes = () => {
    api.get('/participantes').then(res => setParticipantes(res.data));
  };

  useEffect(() => { carregarParticipantes(); }, []);

  const handleDeletar = async (id) => {
    if (window.confirm("Deseja realmente excluir este participante?")) {
      await api.delete(`/participantes/${id}`);
      carregarParticipantes();
    }
  };

  const handleEditar = (p) => {
    setCurrentPart(p);
    setShowModal(true);
  };

  const salvarEdicao = async () => {
    await api.put(`/participantes/${currentPart.id}`, currentPart);
    setShowModal(false);
    carregarParticipantes();
  };

  return (
    <Container>
      <h3>Gerenciar Participantes</h3>
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {participantes.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nome}</td>
              <td>{p.email}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEditar(p)} className="me-2">
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDeletar(p.id)}>
                  <i className="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal de Edição */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton><Modal.Title>Editar Participante</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control 
                value={currentPart.nome} 
                onChange={e => setCurrentPart({...currentPart, nome: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                value={currentPart.email} 
                onChange={e => setCurrentPart({...currentPart, email: e.target.value})} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={salvarEdicao}>Salvar Mudanças</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminParticipantes;