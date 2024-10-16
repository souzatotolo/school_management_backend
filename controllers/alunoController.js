const Aluno = require('../models/alunoModel');
const Turma = require('../models/turmaModel');

exports.getAllAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.findAll({ where: { exclusao: false } });
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar alunos' });
  }
};

exports.createAluno = async (req, res) => {
  try {
    const {
      codigo,
      nome,
      cpf,
      data_nascimento,
      email,
      telefone,
      endereco,
      turma_id,
    } = req.body;

    const turma = await Turma.findByPk(turma_id, {
      include: { model: Aluno },
    });

    if (turma.alunos.length >= turma.qtd_alunos) {
      return res
        .status(400)
        .json({ error: 'Limite de alunos atingido para essa turma.' });
    }

    const novoAluno = await Aluno.create({
      codigo,
      nome,
      cpf,
      data_nascimento,
      email,
      telefone,
      endereco,
      turma_id,
    });
    res.json(novoAluno);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Erro ao criar aluno', error: error.message });
  }
};

exports.deleteAluno = async (req, res) => {
  try {
    const { id } = req.params;
    await Aluno.update({ exclusao: true }, { where: { id } });
    res.json({ message: 'Aluno excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir aluno' });
  }
};

exports.updateAluno = async (req, res) => {
  const { id } = req.params;
  const {
    codigo,
    nome,
    cpf,
    data_nascimento,
    email,
    telefone,
    endereco,
    turma_id,
  } = req.body;

  try {
    const aluno = await Aluno.findByPk(id);
    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    await aluno.update({
      codigo,
      nome,
      cpf,
      data_nascimento,
      email,
      telefone,
      endereco,
      turma_id,
    });
    res.json({ message: 'Aluno atualizado com sucesso', aluno });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Erro ao atualizar aluno', detalhes: error.message });
  }
};
