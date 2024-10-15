const { DataTypes } = require('sequelize');
const sequelize = require('../db/dbConfig');

const Materia = sequelize.define(
  'materias',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codigo: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    exclusao: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = Materia;
