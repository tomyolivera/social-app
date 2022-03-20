const yup = require('yup');

const UserValidation = {
    email: yup.string().email().required("Email is required"),
    username: yup.string().required("Username is required").min(6).max(25),
    password: yup.string().required().min(6),
    name: yup.string().required().min(3).max(90),
    description: yup.string().max(300),
    photo: yup.string().max(255),
    is_banned: yup.boolean(),
    is_enabled: yup.boolean(),
    dark_mode: yup.boolean(),
    status: yup.number().min(0).max(3),
}

const PublicationValidation = {
    description: yup.string().max(300),
    photo: yup.string().required().max(500),
}

module.exports = { UserValidation, PublicationValidation }