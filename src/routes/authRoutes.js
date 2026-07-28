const express = require('express');
const { register,login } = require('../controllers/authController');
const { registerValidationRules,loginValidationRules, validate } = require('../middleware/validators');

const router = express.Router();

router.post('/register', registerValidationRules, validate, register);
router.post('/login', loginValidationRules, validate, login);

module.exports = router;