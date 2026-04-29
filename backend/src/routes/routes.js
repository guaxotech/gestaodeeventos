const express = require('express');
const routes = express.Router();

const PalestranteController = require('../controllers/PalestranteController');
const EventoController = require('../controllers/EventoController');
const InscricaoController = require('../controllers/InscricaoController');
const ParticipanteController = require('../controllers/ParticipanteController');

// Rotas de Palestrantes
routes.get('/palestrantes', PalestranteController.index);
routes.post('/palestrantes', PalestranteController.store);
routes.put('/palestrantes/:id', PalestranteController.update);
routes.delete('/palestrantes/:id', PalestranteController.delete);

// Rotas de Eventos
routes.get('/eventos', EventoController.index);
routes.post('/eventos', EventoController.store);

// Rotas de Inscrições
routes.post('/eventos/:eventoId/inscricoes', InscricaoController.store);
routes.get('/eventos/:eventoId/inscricoes', InscricaoController.index);

// Rotas de Participantes
routes.post('/participantes', ParticipanteController.store);
routes.get('/participantes', ParticipanteController.index);

module.exports = routes;