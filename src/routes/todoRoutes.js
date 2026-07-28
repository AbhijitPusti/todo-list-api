const express = require('express');
const { create, list, update, remove } = require('../controllers/todoController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authenticate);

router.post('/', create);
router.get('/', list);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;