const express = require('express');
const { register } = require('../controllers/authController');
const { registerValidationRules, validate } = require('../middleware/validators');

const router = express.Router();

router.post('/register', registerValidationRules, validate, register);

module.exports = router;