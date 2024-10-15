const express = require('express');
const materiaController = require('../controllers/materiaController');
const router = express.Router();

router.get('/', materiaController.getAllMaterias); 
router.post('/', materiaController.createMateria); 
router.put('/:id', materiaController.deleteMateria); 

module.exports = router;
