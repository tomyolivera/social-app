const User = require('../models/User');
const jwt = require('jsonwebtoken');
const yup = require('yup');
require('dotenv').config();

const { comparePassword, createAccessToken, hashPassword } = require('../helpers/Functions');
const { UserValidation } = require('../helpers/Validations');

const cookiesOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIES_EXPIRES_IN * 60 * 60 * 1000),
    httpOnly: true
}

exports.getUser = async (req, res) => {
    if(req.cookies.jwt){
        const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_TOKEN);

        User.findById(decoded.id, (err, data) => {
            if(err)
                return res.json("User not founded");

            return res.json(data);
        });
    } else{
        return res.json("User not authenticated");
    }
}

exports.register = async (req, res) => {
    if(req.cookies.jwt)
        return res.json("User already authenticated");

    const user = {
        email: req.body.email,
        username: req.body.username,
        name: req.body.name
    }

    const password = req.body.password;

    const isValid = await yup.object().shape(UserValidation).isValid({ ...user, password })

    if(isValid){
        User.create({ ...user, password: await hashPassword(password) }, (err, data) => {
            return err
                ? res.json(err.message || "User can not be created")
                : this.login(req, res);
        });
    }else return res.status(400).json("Check the fields!");
}

exports.login = (req, res) => {
    if(req.cookies.jwt)
        return res.status(204).json("User already authenticated");

    const username = req.body.username;
    const password = req.body.password;

    if(!username || !password)
        return res.status(204).json("Complete the fields!");

    User.findLoginByUsername(username, async (err, data) => {
        if(err || data[0] === undefined)
            return res.status(204).json("User can not be founded");

        if(await comparePassword(password, data[0].password)) {
            this.setAccessToken(res, data[0].id);

            res.json("Logged in successfully");
        } else {
            res.status(204).json("Wrong password!");
        }
    });
}

exports.setAccessToken = (res, id) => {
    const token = createAccessToken(id);
    res.cookie('jwt', token, cookiesOptions);
}

exports.logout = (req, res) => {
    if(!req.cookies.jwt)
        return res.json("User already logged out");

    res.clearCookie('jwt');
    return res.json("Logged out successfully");
}

exports.IsAuthenticated = (req, res, next) => {
    if(req.cookies.jwt){
        const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_TOKEN);

        User.findById(decoded.id, (err, data) => {
            if(err)
                return res.json("User not founded");

            req.user = data[0];
            return next();
        });
    } else{
        return res.status(204).json("User not authenticated");
    }
}