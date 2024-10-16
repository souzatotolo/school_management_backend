const Sala = require('../models/salaModel');

exports.getAllSalas = async (req, res) => {
  try {
    const salas = await Sala.findAll({ where: { exclusao: false } });
    res.json(salas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar salas' });
  }
};

exports.createSala = async (req, res) => {
  try {
    const { codigo, nome } = req.body;
    const novaSala = await Sala.create({ codigo, nome });
    res.json(novaSala);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Erro ao criar sala', detalhes: error.message });
  }
};

exports.deleteSala = async (req, res) => {
  try {
    const { id } = req.params;
    await Sala.update({ exclusao: true }, { where: { id } });
    res.json({ message: 'Sala excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir sala' });
  }
};

exports.updateSala = async (req, res) => {
  const { id } = req.params;
  const { codigo, nome } = req.body;

  try {
    const sala = await Sala.findByPk(id);
    if (!sala) {
      return res.status(404).json({ error: 'Sala não encontrada' });
    }

    await sala.update({ codigo, nome });
    res.json({ message: 'Sala atualizada com sucesso', sala });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Erro ao atualizar sala', detalhes: error.message });
  }
};
