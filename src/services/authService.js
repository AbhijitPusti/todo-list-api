const bcrypt = require('bcrypt');
const User = require('../models/User');

const SALT_ROUNDS = 10;

const registerUser = async ({name,email,password}) => {
     const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

     const user = await User.create({
        name,
        email,
        password:hashedPassword,
     });

     return user;
}

module.exports = { registerUser};