const express = require('express');
const routes = express.Router();
const authMiddleware = require('../middlewares/auth');

const UsuarioController = require('../controllers/UsuarioController');
const PalestranteController = require('../controllers/PalestranteController');
const EventoController = require('../controllers/EventoController');
const InscricaoController = require('../controllers/InscricaoController');
const ParticipanteController = require('../controllers/ParticipanteController');

// Rotas de Palestrantes
routes.get('/palestrantes', PalestranteController.index);
routes.post('/palestrantes', authMiddleware, PalestranteController.store);
routes.put('/palestrantes/:id', authMiddleware, PalestranteController.update);
routes.delete('/palestrantes/:id', authMiddleware, (req, res, next) => {
  if (req.usuarioTipo !== 'admin') {
    return res.status(403).json({ error: 'Acesso negado. Apenas administradores podem deletar registros.' });
  }
  next();
}, PalestranteController.delete);

// Rotas de Eventos
routes.get('/eventos', EventoController.index);
routes.post('/eventos', authMiddleware, EventoController.store);
routes.put('/eventos/:id', authMiddleware, EventoController.update);  
// Rota de deletar protegida por login E por verificação de Admin
routes.delete('/eventos/:id', authMiddleware, (req, res, next) => {
  if (req.usuarioTipo !== 'admin') {
    return res.status(403).json({ error: 'Acesso negado. Apenas administradores podem deletar registros.' });
  }
  next();
}, EventoController.delete);

// Rotas de Inscrições
routes.post('/eventos/:eventoId/inscricoes', authMiddleware, InscricaoController.store);
routes.get('/eventos/:eventoId/inscricoes', authMiddleware, InscricaoController.index);
routes.put('/inscricoes/:id', authMiddleware, InscricaoController.update);
routes.delete('/inscricoes/:id', authMiddleware, (req, res, next) => {
  if (req.usuarioTipo !== 'admin') {
    return res.status(403).json({ error: 'Acesso negado. Apenas administradores podem deletar registros.' });
  }
  next();
}, InscricaoController.delete); 

// Rotas de Participantes
routes.post('/participantes', authMiddleware, ParticipanteController.store);
routes.get('/participantes', authMiddleware, ParticipanteController.index);
routes.put('/participantes/:id', authMiddleware, ParticipanteController.update); 
routes.delete('/participantes/:id', authMiddleware, (req, res, next) => {
  if (req.usuarioTipo !== 'admin') {
    return res.status(403).json({ error: 'Acesso negado. Apenas administradores podem deletar registros.' });
  }
  next();
}, ParticipanteController.delete);

// Rotas de Usuários
routes.post('/usuarios', UsuarioController.store); // Criar conta
routes.post('/login', UsuarioController.login);    // Fazer Login
routes.put('/usuarios/:id', authMiddleware, UsuarioController.update);

module.exports = routes;