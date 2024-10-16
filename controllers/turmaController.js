const Turma = require('../models/turmaModel');
const Materia = require('../models/materiaModel');
const Sala = require('../models/salaModel');

exports.getAllTurmas = async (req, res) => {
  try {
    const turmas = await Turma.findAll({ where: { exclusao: false } });
    res.json(turmas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar turmas' });
  }
};

exports.createTurma = async (req, res) => {
  try {
    const {
      codigo,
      nome,
      serie,
      periodo,
      dia_semana,
      qtd_alunos,
      materia_id,
      sala_id,
    } = req.body;

    const materia = await Materia.findByPk(materia_id);
    const sala = await Sala.findByPk(sala_id);
    if (!materia || !sala) {
      return res.status(400).json({ error: 'Matéria ou sala não encontrada' });
    }

    const turmaExistente = await Turma.findOne({
      where: { sala_id, dia_semana, periodo, exclusao: false },
    });
    if (turmaExistente) {
      return res
        .status(400)
        .json({ error: 'Ja existe uma turma na mesma sala, dia e período' });
    }

    const novaTurma = await Turma.create({
      codigo,
      nome,
      serie,
      periodo,
      dia_semana,
      qtd_alunos,
      materia_id,
      sala_id,
    });
    res.json(novaTurma);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar turma' });
  }
};

exports.deleteTurma = async (req, res) => {
  try {
    const { id } = req.params;
    await Turma.update({ exclusao: true }, { where: { id } });
    res.json({ message: 'Turma excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir turma' });
  }
};

exports.updateTurma = async (req, res) => {
  const { id } = req.params;
  const {
    codigo,
    nome,
    serie,
    periodo,
    dia_semana,
    qtd_alunos,
    materia_id,
    sala_id,
  } = req.body;

  try {
    const turma = await Turma.findByPk(id);
    if (!turma) {
      return res.status(404).json({ error: 'Turma não encontrada' });
    }

    await turma.update({
      codigo,
      nome,
      serie,
      periodo,
      dia_semana,
      qtd_alunos,
      materia_id,
      sala_id,
    });
    res.json({ message: 'Turma atualizada com sucesso', turma });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Erro ao atualizar turma', detalhes: error.message });
  }
};

exports.updateMateria = async (req, res) => {
  const { id } = req.params;
  const { codigo, nome } = req.body;

  try {
    const materia = await Materia.findByPk(id);
    if (!materia) {
      return res.status(404).json({ error: 'Matéria não encontrada' });
    }

    await materia.update({ codigo, nome });
    res.json({ message: 'Matéria atualizada com sucesso', materia });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Erro ao atualizar matéria', detalhes: error.message });
  }
};
