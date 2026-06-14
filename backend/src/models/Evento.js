const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Palestrante = require('./Palestrante');

const Evento = sequelize.define('Evento', {
  titulo: { type: DataTypes.STRING, allowNull: false },
  data: { type: DataTypes.DATE, allowNull: false },
  local: { type: DataTypes.STRING }
});

// Relacionamento: 1 Palestrante tem muitos Eventos
Palestrante.hasMany(Evento, { foreignKey: 'palestranteId', onDelete: 'CASCADE' });
Evento.belongsTo(Palestrante, { foreignKey: 'palestranteId' });

module.exports = Evento;