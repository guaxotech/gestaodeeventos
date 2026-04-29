const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Palestrante = sequelize.define('Palestrante', {
  nome: { type: DataTypes.STRING, allowNull: false },
  especialidade: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true }
});

module.exports = Palestrante;