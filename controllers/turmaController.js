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
