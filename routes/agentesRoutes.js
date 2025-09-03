const express = require('express')
const router = express.Router();
const controller = require('../controllers/agentesController');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.partialUpdate);
router.delete('/:id', controller.deleteAgent);

module.exports = router;