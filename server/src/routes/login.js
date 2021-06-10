const { Router } = require('express');
const jwt = require('jsonwebtoken');

const passport = require('../controllers/passport');
const { getAuthSuccess, getAuthFail, getToken, verifyToken, getAuthLogout } = require('../controllers/login');

const loginRouter = new Router();

loginRouter.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }));
loginRouter.get('/callback', passport.authenticate('google', { successRedirect: '/api/auth/success', failureRedirect: '/api/auth/fail' }));
loginRouter.get('/success', getAuthSuccess);
loginRouter.get('/fail', getAuthFail);
loginRouter.get('/logout', getAuthLogout);
loginRouter.get('/token', getToken);
loginRouter.get('/verifyToken', verifyToken);

module.exports = loginRouter;
