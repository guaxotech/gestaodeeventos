const Inscricao = require('../models/Inscricao');
const Evento = require('../models/Evento');

module.exports = {
  async store(req, res) {
    try {
      const { eventoId } = req.params; 
      const { participanteId, pago } = req.body;

      const evento = await Evento.findByPk(eventoId);
      if (!evento) {
        return res.status(404).json({ error: 'Evento não encontrado' });
      }

      const inscricao = await Inscricao.create({
        participanteId,
        pago,
        eventoId 
      });

      return res.status(201).json(inscricao);
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao realizar inscrição' });
    }
  },

  async index(req, res) {
    const { eventoId } = req.params;
    try {
      const inscricoes = await Inscricao.findAll({ 
        where: { eventoId },
        include: { association: 'Participante' } // Opcional: traz os dados do participante junto
      });
      return res.json(inscricoes);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao buscar inscrições' });
    }
  },

  async update(req, res) {
    const { id } = req.params; // ID da inscrição
    try {
      const [updated] = await Inscricao.update(req.body, {
        where: { id: id }
      });

      if (updated) {
        const inscricaoAtualizada = await Inscricao.findByPk(id);
        return res.json(inscricaoAtualizada);
      }

      return res.status(404).json({ error: 'Inscrição não encontrada' });
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao atualizar inscrição' });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Inscricao.destroy({
        where: { id: id }
      });

      if (deleted) {
        return res.status(204).send();
      }

      return res.status(404).json({ error: 'Inscrição não encontrada' });
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao cancelar inscrição' });
    }
  }
};