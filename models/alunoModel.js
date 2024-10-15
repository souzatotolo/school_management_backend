const { DataTypes } = require('sequelize');
const sequelize = require('../db/dbConfig');
const Turma = require('./turmaModel');

const Aluno = sequelize.define(
  'alunos',
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
    cpf: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true,
    },
    data_nascimento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    telefone: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    endereco: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    exclusao: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: false, freezeTableName: true }
);

Aluno.belongsTo(Turma, { foreignKey: 'turma_id' });

module.exports = Aluno;
