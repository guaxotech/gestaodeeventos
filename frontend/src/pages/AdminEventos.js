import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import api from '../services/api';

const AdminEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [palestrantes, setPalestrantes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [currentEvt, setCurrentEvt] = useState({
    id: '',
    titulo: '',
    data: '',
    local: '',
    palestranteId: ''
  });

  const carregarDados = async () => {
    const resEvt = await api.get('/eventos');
    const resPal = await api.get('/palestrantes');
    setEventos(resEvt.data);
    setPalestrantes(resPal.data);
  };

  useEffect(() => { carregarDados(); }, []);

  const handleSalvar = async () => {
    try {
      // Criamos um objeto apenas com os campos que o banco aceita
      const payload = {
        titulo: currentEvt.titulo,
        data: currentEvt.data,
        local: currentEvt.local,
        palestranteId: parseInt(currentEvt.palestranteId)
      };

      if (currentEvt.id) {
        // No PUT, enviamos o payload limpo
        await api.put(`/eventos/${currentEvt.id}`, payload);
      } else {
        await api.post('/eventos', payload);
      }

      setShowModal(false);
      carregarDados();
      alert("Evento salvo com sucesso!");
    } catch (err) {
      console.error("Erro ao salvar:", err.response?.data);
      alert("Erro ao salvar evento. Verifique o console.");
    }
  };;

  const handleDeletar = async (id) => {
    if (window.confirm("Excluir este evento?")) {
      await api.delete(`/eventos/${id}`);
      carregarDados();
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3><i className="bi bi-calendar-check"></i> Gerenciar Eventos</h3>
        <Button variant="success" onClick={() => { setCurrentEvt({ titulo: '', data: '', local: '', palestranteId: '' }); setShowModal(true); }}>
          + Novo Evento
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Evento</th>
            <th>Data</th>
            <th>Local</th>
            <th>Palestrante</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {eventos.map(e => (
            <tr key={e.id}>
              <td>{e.titulo}</td>
              <td>{new Date(e.data).toLocaleDateString()}</td>
              <td>{e.local}</td>
              <td>{e.Palestrante?.nome || 'Não definido'}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    setCurrentEvt({
                      id: e.id,
                      titulo: e.titulo,
                      data: e.data,
                      local: e.local,
                      palestranteId: e.palestranteId // Certifique-se que o nome aqui bate com o que vem da API
                    });
                    setShowModal(true);
                  }}
                >
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDeletar(e.id)}>
                  <i className="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton><Modal.Title>Dados do Evento</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Nome do Evento</Form.Label>
              <Form.Control value={currentEvt.titulo} onChange={e => setCurrentEvt({ ...currentEvt, titulo: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Data</Form.Label>
              <Form.Control type="date" value={currentEvt.data ? currentEvt.data.split('T')[0] : ''} onChange={e => setCurrentEvt({ ...currentEvt, data: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Local</Form.Label>
              <Form.Control value={currentEvt.local} onChange={e => setCurrentEvt({ ...currentEvt, local: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Palestrante</Form.Label>
              <Form.Select value={currentEvt.palestranteId} onChange={e => setCurrentEvt({ ...currentEvt, palestranteId: e.target.value })}>
                <option value="">Selecione um palestrante</option>
                {palestrantes.map(p => (
                  <option key={p.id} value={p.id}>{p.nome}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSalvar} disabled={!currentEvt.palestranteId}>Salvar Evento</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminEventos;