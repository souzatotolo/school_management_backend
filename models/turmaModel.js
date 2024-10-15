const { DataTypes } = require('sequelize');
const sequelize = require('../db/dbConfig');
const Materia = require('./materiaModel');
const Sala = require('./salaModel');

const Turma = sequelize.define(
  'turmas',
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
    serie: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    periodo: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    dia_semana: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    qtd_alunos: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    exclusao: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: false, freezeTableName: true }
);

Turma.belongsTo(Materia, { foreignKey: 'materia_id' });
Turma.belongsTo(Sala, { foreignKey: 'sala_id' });

module.exports = Turma;
