const express = require('express');
const alunoController = require('../controllers/alunoController');
const router = express.Router();

router.get('/', alunoController.getAllAlunos);
router.post('/', alunoController.createAluno);
router.put('/:id', alunoController.deleteAluno);
router.put('/update/:id', alunoController.updateAluno);

module.exports = router;
