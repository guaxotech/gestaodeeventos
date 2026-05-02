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
routes.put('/eventos/:id', EventoController.update);  
routes.delete('/eventos/:id', EventoController.delete);

// Rotas de Inscrições
routes.post('/eventos/:eventoId/inscricoes', InscricaoController.store);
routes.get('/eventos/:eventoId/inscricoes', InscricaoController.index);
routes.put('/inscricoes/:id', InscricaoController.update);
routes.delete('/inscricoes/:id', InscricaoController.delete); 

// Rotas de Participantes
routes.post('/participantes', ParticipanteController.store);
routes.get('/participantes', ParticipanteController.index);
routes.put('/participantes/:id', ParticipanteController.update); 
routes.delete('/participantes/:id', ParticipanteController.delete);

module.exports = routes;