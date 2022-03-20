const User = require('../models/User');
const yup = require('yup');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { UserValidation } = require('../helpers/Validations');
const { hashPassword, comparePassword } = require('../helpers/Functions');
const UserFollowing = require('../models/UserFollowing');

const setUserConfig = (req, u) => {
    let user = u;
    user.acceptedUsers = user?.accepted?.split(',').map(a=>a.substr(-1));

    if(req.cookies.jwt){
        const { id } = jwt.verify(req.cookies.jwt, process.env.JWT_TOKEN);

        if(user.followers?.split(',').indexOf(''+id) !== -1){
            user.IAmFollowing = !user.acceptedUsers ? 0 : user?.acceptedUsers[user.followers?.split(',').indexOf(''+id)] === '1' ? 1 : 2;
        }else user.IAmFollowing = 0;
    }else user.IAmFollowing = 0

    return user;
}

exports.findAll = (req, res) => {
    User.findAll((err, data) => {
        let finalUsers = [];
        data.map(user => finalUsers.push(setUserConfig(req, user)));
        res.json(finalUsers);
    });
}

exports.findById = (req, res) => {
    User.findById(req.params.id, (err, data) => {
        res.json(setUserConfig(req, data[0]));
    })
}

exports.findByUsername = (req, res) => {
    User.findByUsername(req.params.username, (err, data) => {
        let finalUsers = [];
        data.map(user => {
            finalUsers.push(setUserConfig(req, user));
        });
        res.json(finalUsers);
    });
}

exports.searchByUsername = (req, res) => {
    User.findByUsername(req.params.username, (err, data) => {
        res.json(data);
    });
}

exports.create = async (req, res) => {
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
                ? res.status(500).json(err.message || "User can not be created")
                : res.status(200).json(data);
        });
    }else return res.status(400).json("Check the fields!");
}

exports.update = async (req, res) => {
    // const isValid = await yup.object().shape(UserValidation).isValid(req.body)

    if(true){
        User.update(req.params.id, req.body, (err, data) => {
            res.json(data);
        });
    }else{   
        return res.json("Check the fields!");
    }
}

exports.delete = (req, res) => {
    if(req.params.id !== req.user.id)
        return res.status(403).json("Forbidden");

    User.delete(req.params.id, (err, data) => {
        if(err)
            res.status(500).json(err.message || "User can not be deleted");
        else res.status(200).json(data);
    });
}

exports.deleteAll = (req, res) => {
    User.deleteAll((err, data) => {
        if(err)
            res.status(500).json(err.message || "User can not be deleted");
        else res.status(200).json(data);
    });
}

// Extras
exports.followOrUnfollow = (req, res) => {
    const user_id_following = req.params.user_id_following;
    const user_id_followed = req.params.user_id_followed;
    
    if(Number(user_id_following) !== req.user.id)
        return res.status(403).json("Forbidden");

    UserFollowing.findByIds(user_id_following, user_id_followed, (err, data) => {
        if(data.length > 0){
            UserFollowing.delete(user_id_following, user_id_followed, (err, data) => {
                res.json("unfollowed");
            });
        }else{
            User.findById(user_id_followed, (err, data) => {
                const is_accepted = !data[0].is_private
                UserFollowing.create({ user_id_following, user_id_followed, is_accepted }, (err, data) => {
                    res.json(is_accepted ? "followed" : "waiting");
                });
            })
        }
    });
}

exports.disableOrEnableDarkMode = (req, res) => {
    
}

exports.banOrUnbanAccount = (req, res) => {
    
}

exports.disableOrEnableAccount = (req, res) => {

}

exports.changePassword = async (req, res) => {
    const oldpassword = req.body.oldpassword;
    let password = req.body.newpassword;

    const isValid = await yup.object().shape({ password: UserValidation.password }).isValid({ password })
    
    if(isValid){
        User.findById(req.params.id, async (err, data) => {
            if(!await comparePassword(oldpassword, data[0].password))
                return res.status(400).json("The old password is incorrect");

            password = await hashPassword(password);
            User.update(req.params.id, { password }, (err, data) => {
                if(err)
                res.status(500).json(err.message || "User can not be updated");
                else res.status(200).json(data);
            });
        });
    }else{   
        return res.status(400).json("Check the fields!");
    }
}