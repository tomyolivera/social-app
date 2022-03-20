const express = require('express');
const router = express.Router();

const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');
const PublicationController = require('./controllers/PublicationController');

// Auth API routes
router.post('/api/auth/register', AuthController.register);
router.post('/api/auth/login', AuthController.login);
router.get('/api/auth/user', AuthController.IsAuthenticated,  AuthController.getUser);
router.get('/api/auth/logout', AuthController.logout);

// User API routes
router.get('/api/users', UserController.findAll);
router.get('/api/users/:id', UserController.findById);
router.get('/api/users/username/:username', UserController.findByUsername);
router.get('/api/users/search/:username', UserController.searchByUsername);
router.post('/api/users', UserController.create);
router.put('/api/users/:id', AuthController.IsAuthenticated, UserController.update);
router.put('/api/users/changePassword/:id', AuthController.IsAuthenticated, UserController.changePassword);
router.delete('/api/users/:id', AuthController.IsAuthenticated, UserController.delete);

router.get('/api/users/follow/:user_id_following/:user_id_followed', AuthController.IsAuthenticated, UserController.followOrUnfollow);

// Publication API routes
router.get('/api/publications', PublicationController.findAll);
router.get('/api/publications/:id', PublicationController.findById);
router.get('/api/publications/user/:user_id', PublicationController.findByUser);
router.post('/api/publications', AuthController.IsAuthenticated, PublicationController.create);
router.put('/api/publications/:id', AuthController.IsAuthenticated, PublicationController.update);
router.delete('/api/publications/:id', AuthController.IsAuthenticated, PublicationController.delete);

router.get('/api/publications/like/:user_id/:publication_id', PublicationController.likeOrDislike);

module.exports = router;