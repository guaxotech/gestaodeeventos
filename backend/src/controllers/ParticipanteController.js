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
    const participantes = await Participante.findAll();
    return res.json(participantes);
  }
};