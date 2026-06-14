import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import api from '../services/api';

const AdminPalestrantes = () => {
  const [palestrantes, setPalestrantes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [currentPal, setCurrentPal] = useState({ id: '', nome: '', especialidade: '' });

  const carregarData = () => {
    api.get('/palestrantes').then(res => setPalestrantes(res.data));
  };

  useEffect(() => { carregarData(); }, []);

  const handleSalvar = async () => {
    try {
      if (currentPal.id) {
        await api.put(`/palestrantes/${currentPal.id}`, currentPal);
      } else {
        await api.post('/palestrantes', currentPal);
      }
      setShowModal(false);
      setMsg({ type: 'success', text: 'Operação realizada com sucesso!' });
      carregarData();
    } catch (err) {
      setMsg({ type: 'danger', text: 'Erro ao salvar palestrante.' });
    }
  };

  const handleDeletar = async (id) => {
    if (window.confirm("Excluir este palestrante?")) {
      await api.delete(`/palestrantes/${id}`);
      carregarData();
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3><i className="bi bi-mic"></i> Gerenciar Palestrantes</h3>
        <Button variant="success" onClick={() => { setCurrentPal({ nome: '', especialidade: '' }); setShowModal(true); }}>
          + Novo Palestrante
        </Button>
      </div>

      {msg.text && <Alert variant={msg.type} onClose={() => setMsg({text:''})} dismissible>{msg.text}</Alert>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Especialidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {palestrantes.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nome}</td>
              <td>{p.especialidade}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => { setCurrentPal(p); setShowModal(true); }}>
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton><Modal.Title>{currentPal.id ? 'Editar' : 'Novo'} Palestrante</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control value={currentPal.nome} onChange={e => setCurrentPal({...currentPal, nome: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Especialidade</Form.Label>
              <Form.Control value={currentPal.especialidade} onChange={e => setCurrentPal({...currentPal, especialidade: e.target.value})} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSalvar}>Salvar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminPalestrantes;