const express = require('express');
const salaController = require('../controllers/salaController');
const router = express.Router();

router.get('/', salaController.getAllSalas); 
router.post('/', salaController.createSala); 
router.put('/:id', salaController.deleteSala); 

module.exports = router;
