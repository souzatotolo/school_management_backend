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
