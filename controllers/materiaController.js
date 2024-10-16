const Materia = require('../models/materiaModel');

exports.getAllMaterias = async (req, res) => {
  try {
    const materias = await Materia.findAll({ where: { exclusao: false } });
    res.json(materias);
  } catch (error) {
    console.error('Erro ao buscar matérias:', error);
    res
      .status(500)
      .json({ error: 'Erro ao buscar matérias', detalhes: error.message });
  }
};

exports.createMateria = async (req, res) => {
  try {
    const { codigo, nome } = req.body;
    const novaMateria = await Materia.create({ codigo, nome });
    res.json(novaMateria);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar matéria' });
  }
};

exports.deleteMateria = async (req, res) => {
  try {
    const { id } = req.params;
    await Materia.update({ exclusao: true }, { where: { id } });
    res.json({ message: 'Matéria excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir matéria' });
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
