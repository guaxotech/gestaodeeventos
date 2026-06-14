const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Participante = sequelize.define('Participante', {
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Participante.belongsTo(sequelize.models.Usuario || require('./Usuario'), {
  foreignKey: 'usuarioId',
  as: 'usuario'
});

module.exports = Participante;