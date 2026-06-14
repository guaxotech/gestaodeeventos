const Inscricao = require('../models/Inscricao');
const Evento = require('../models/Evento');
const Participante = require('../models/Participante');

module.exports = {
  async store(req, res) {
    try {
      const { eventoId } = req.params;
      const usuarioId = req.usuarioId; 

      // 1. Verifica se o evento existe
      const evento = await Evento.findByPk(eventoId);
      if (!evento) {
        return res.status(404).json({ error: 'Evento não encontrado' });
      }

      // 2. Busca o participante que está vinculado a este ID de usuário
      const participante = await Participante.findOne({
        where: { usuarioId: usuarioId }
      });

      // Se o usuário logado ainda não tiver um registro na tabela de participantes:
      if (!participante) {
        return res.status(400).json({
          error: 'Você precisa preencher seus dados de participante antes de se inscrever.'
        });
      }

      // Bloqueia inscrições duplicadas
      const inscricaoExistente = await Inscricao.findOne({
        where: {
          participanteId: participante.id,
          eventoId: eventoId
        }
      });

      if (inscricaoExistente) {
        return res.status(400).json({ error: 'Você já está inscrito neste evento!' });
      }

      // 3. Cria a inscrição usando o ID do participante encontrado
      const inscricao = await Inscricao.create({
        participanteId: participante.id, 
        pago: false,
        eventoId
      });

      return res.status(201).json(inscricao);
    } catch (err) {
      console.error("Erro no banco:", err);
      return res.status(400).json({ error: 'Erro ao realizar inscrição' });
    }
  },

  async index(req, res) {
    const { eventoId } = req.params;
    try {
      const inscricoes = await Inscricao.findAll({
        where: { eventoId },
        include: { association: 'Participante' } // traz os dados do participante junto
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