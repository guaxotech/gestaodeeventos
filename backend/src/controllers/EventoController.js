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
  }
  // ... implementar update e delete seguindo a lógica acima
};