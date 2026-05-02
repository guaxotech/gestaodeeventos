import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import api from '../services/api';

const CadastroParticipante = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/participantes', { nome, email });
      setMensagem({ tipo: 'success', texto: `Sucesso! Seu ID é: ${res.data.id}. Guarde-o para se inscrever.` });
      setNome(''); setEmail('');
    } catch (err) {
      setMensagem({ tipo: 'danger', texto: 'Erro ao cadastrar. Tente outro e-mail.' });
    }
  };

  return (
    <Container>
      <Card className="mx-auto shadow" style={{ maxWidth: '500px' }}>
        <Card.Body>
          <h3 className="text-center mb-4"><i className="bi bi-person-plus"></i> Novo Participante</h3>
          {mensagem.texto && <Alert variant={mensagem.tipo}>{mensagem.texto}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome Completo</Form.Label>
              <Form.Control 
                type="text" 
                value={nome} 
                onChange={(e) => setNome(e.target.value)} 
                required 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>E-mail</Form.Label>
              <Form.Control 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </Form.Group>
            <Button variant="success" type="submit" className="w-100">Cadastrar</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CadastroParticipante;