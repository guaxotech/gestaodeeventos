const Inscricao = require('../models/Inscricao');
const Evento = require('../models/Evento');

module.exports = {
  // Criar uma inscrição vinculada a um evento
  async store(req, res) {
    try {
      const { eventoId } = req.params; // Pegamos o ID do evento pela URL
      const { participanteId, pago } = req.body;

      // Verificamos se o evento existe antes de inscrever
      const evento = await Evento.findByPk(eventoId);
      if (!evento) {
        return res.status(404).json({ error: 'Evento não encontrado' });
      }

      const inscricao = await Inscricao.create({
        participanteId,
        pago,
        eventoId // A chave estrangeira que liga ao evento
      });

      return res.status(201).json(inscricao);
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao realizar inscrição' });
    }
  },

  // Listar todas as inscrições de um evento específico
  async index(req, res) {
    const { eventoId } = req.params;
    const inscricoes = await Inscricao.findAll({ where: { eventoId } });
    return res.json(inscricoes);
  }
};