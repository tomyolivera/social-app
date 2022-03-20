const Publication = require('../models/Publication');
const { PublicationValidation } = require('../helpers/Validations');
const PublicationLike = require('../models/PublicationLike');
const jwt = require('jsonwebtoken');

const yup = require('yup');

const setPublicationConfig = (req, p) => {
    let publication = p;
    
    if(req.cookies.jwt){
        const { id } = jwt.verify(req.cookies.jwt, process.env.JWT_TOKEN);
        
        publication.ILiked = publication.users_liked?.includes(id) || false
    }else publication.ILiked = false;

    return publication;
}

exports.findAll = (req, res) => {
    Publication.findAll((err, data) => {
        const finalPublications = [];
        data.map(p => finalPublications.push(setPublicationConfig(req, p)));
        res.json(finalPublications);
    });
}

exports.findById = (req, res) => {
    Publication.findById(req.params.id, (err, data) => {
        const finalPublications = [];
        data.map(p => finalPublications.push(setPublicationConfig(req, p)));
        res.json(finalPublications);
    })
}

exports.findByUser = (req, res) => {
    Publication.findByUser(req.params.user_id, (err, data) => {
        const finalPublications = [];
        data.map(p => finalPublications.push(setPublicationConfig(req, p)));
        res.json(finalPublications);
    });
}

exports.create = async (req, res) => {
    const isValid = await yup.object().shape(PublicationValidation).isValid(req.body)

    if(isValid){
        let publication = { ...req.body, user_id: req.user.id }
        Publication.create(publication, (err, data) => {
            return err
                ? res.status(500).json(err.message || "Publication can not be created")
                : res.status(200).json(data);
        });
    }else return res.status(400);
}

exports.update = async (req, res) => {
    const isValid = await yup.object().shape({ description: PublicationValidation.description }).isValid(req.body)

    if(isValid){
        Publication.update(req.params.id, req.body, (err, data) => {
            if(err)
                res.status(500).json(err.message || "Publication can not be updated");
            else res.status(200).json(data);
        });
    }else return res.json("Check the fields!");
}

exports.delete = (req, res) => {
    Publication.delete(req.params.id, (err, data) => {
        if(err)
            res.status(500).json(err.message || "Publication can not be deleted");
        else res.status(200).json(data);
    });
}

exports.deleteAll = (req, res) => {
    Publication.deleteAll((err, data) => {
        if(err)
            res.status(500).json(err.message || "Publications can not be deleted");
        else res.status(200).json(data);
    });
}


// Extras
exports.likeOrDislike = (req, res) => {
    PublicationLike.findByUserId(req.params.user_id, req.params.publication_id, (err, data) => {
        if(data.length > 0){
            PublicationLike.delete(req.params.user_id, req.params.publication_id, (err, data) => {
                res.json("Dislike");
            });
        }else{
            PublicationLike.create(req.params, (err, data) => {
                res.json("Like"); 
            });
        }
    });
}