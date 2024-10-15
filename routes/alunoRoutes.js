const express = require('express');
const alunoController = require('../controllers/alunoController');
const router = express.Router();

router.get('/', alunoController.getAllAlunos); 
router.post('/', alunoController.createAluno); 
router.put('/:id', alunoController.deleteAluno); 

module.exports = router;
