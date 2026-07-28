const { registerUser } = require("../services/authService");
const jwt = require('jsonwebtoken');
const register = async (req,res) => {
    try {
        const { name,email,password } = req.body;

        const user = await registerUser({name,email,password});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{
            expiresIn:'1h',
        });

        res.status(201).json({token});
    } catch (error) {
        if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { register };