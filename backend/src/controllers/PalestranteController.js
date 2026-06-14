const Palestrante = require('../models/Palestrante');

module.exports = {
  // Create
  async store(req, res) {
    try {
      const palestrante = await Palestrante.create(req.body);
      return res.status(201).json(palestrante);
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao criar palestrante' });
    }
  },

  // Read (All)
  async index(req, res) {
    const palestrantes = await Palestrante.findAll();
    return res.json(palestrantes);
  },

  // Update
  async update(req, res) {
    const { id } = req.params;
    const [updated] = await Palestrante.update(req.body, { where: { id } });
    if (updated) return res.json({ message: 'Atualizado com sucesso' });
    return res.status(404).json({ error: 'Palestrante não encontrado' });
  },

  // Delete
  async delete(req, res) {
    const { id } = req.params;
    await Palestrante.destroy({ where: { id } });
    return res.status(204).send();
  }
};