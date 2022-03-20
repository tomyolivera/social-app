const { hash, compare } = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.hashPassword = async password => {
    return await hash(password, 10);
}

exports.comparePassword = async (password, hashedPassword) => {
    return await compare(password, hashedPassword);
}

exports.createAccessToken = id => jwt.sign({ id }, process.env.JWT_TOKEN, { expiresIn: process.env.JWT_EXPIRES_IN });