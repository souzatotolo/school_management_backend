const express = require('express');
const materiaController = require('../controllers/materiaController');
const router = express.Router();

router.get('/', materiaController.getAllMaterias);
router.post('/', materiaController.createMateria);
router.put('/:id', materiaController.deleteMateria);
router.put('/update/:id', materiaController.updateMateria);

module.exports = router;
