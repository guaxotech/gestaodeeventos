const Participante = require('../models/Participante');

module.exports = {
  async store(req, res) {
    try {
      const participante = await Participante.create(req.body);
      return res.status(201).json(participante);
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao criar participante. Verifique se o e-mail já existe.' });
    }
  },

  async index(req, res) {
    try {
      const participantes = await Participante.findAll();
      return res.json(participantes);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao buscar participantes.' });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    try {
      const [updated] = await Participante.update(req.body, {
        where: { id: id }
      });

      if (updated) {
        const participanteAtualizado = await Participante.findByPk(id);
        return res.json(participanteAtualizado);
      }

      return res.status(404).json({ error: 'Participante não encontrado.' });
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao atualizar dados. Verifique os campos enviados.' });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Participante.destroy({
        where: { id: id }
      });

      if (deleted) {
        return res.status(204).send();
      }

      return res.status(404).json({ error: 'Participante não encontrado.' });
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao excluir participante.' });
    }
  }
};