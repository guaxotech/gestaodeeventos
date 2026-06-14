const Evento = require('../models/Evento');
const Palestrante = require('../models/Palestrante');

module.exports = {
  async store(req, res) {
    try {
      const evento = await Evento.create(req.body);
      return res.status(201).json(evento);
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao criar evento. Verifique se o palestranteId existe.' });
    }
  },

  async index(req, res) {
    const eventos = await Evento.findAll({
      include: { association: 'Palestrante' } // Traz os dados do palestrante junto
    });
    return res.json(eventos);
  },

  async update(req, res) {
    const { id } = req.params;
    try {
      const [updated] = await Evento.update(req.body, {
        where: { id: id }
      });

      if (updated) {
        const eventoAtualizado = await Evento.findByPk(id);
        return res.json(eventoAtualizado);
      }
      
      return res.status(404).json({ error: 'Evento não encontrado.' });
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao atualizar evento.' });
    }
  },
  
  async delete(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Evento.destroy({
        where: { id: id }
      });

      if (deleted) {
        return res.status(204).send(); // Sucesso sem conteúdo
      }

      return res.status(404).json({ error: 'Evento não encontrado.' });
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao excluir evento.' });
    }
  }
};