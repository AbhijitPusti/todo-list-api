const express = require('express');
const { create, list } = require('../controllers/todoController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authenticate);

router.post('/', create);
router.get('/', list);

module.exports = router;