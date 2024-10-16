const express = require('express');
const turmaController = require('../controllers/turmaController');
const router = express.Router();

router.get('/', turmaController.getAllTurmas);
router.post('/', turmaController.createTurma);
router.put('/:id', turmaController.deleteTurma);
router.put('/update/:id', turmaController.updateTurma);

module.exports = router;
