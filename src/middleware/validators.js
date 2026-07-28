const { body,validationResult } = require("express-validator")

const registerValidationRules = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('A valid email is required'),
    body('password').isLength({ min: 8}).withMessage('Password must be at least 8 characters'),
]

const validate = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ erros: errors.array()});
    }
    next();
};

module.exports = { registerValidationRules, validate };