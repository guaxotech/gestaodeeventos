const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { 
    type: DataTypes.STRING, 
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  senha: { type: DataTypes.STRING, allowNull: false },
  tipo: { 
    type: DataTypes.ENUM('admin', 'normal'), 
    defaultValue: 'normal', 
    allowNull: false
  }
}, {
  tableName: 'Usuarios'
});

Usuario.hasOne(sequelize.models.Participante || require('./Participante'), {
  foreignKey: 'usuarioId',
  as: 'participante'
});

module.exports = Usuario;