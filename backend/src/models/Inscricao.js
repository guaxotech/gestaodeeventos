const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Evento = require('./Evento');
const Participante = require('./Participante');

const Inscricao = sequelize.define('Inscricao', {
  pago: { type: DataTypes.BOOLEAN, defaultValue: false }
});

Evento.hasMany(Inscricao, { foreignKey: 'eventoId', onDelete: 'CASCADE' });
Inscricao.belongsTo(Evento, { foreignKey: 'eventoId' });

Participante.hasMany(Inscricao, { foreignKey: 'participanteId' });
Inscricao.belongsTo(Participante, { foreignKey: 'participanteId' });

module.exports = Inscricao;