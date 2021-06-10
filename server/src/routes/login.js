const { Router } = require('express');
const jwt = require('jsonwebtoken');

const passport = require('../controllers/passport');
const { getAuthFail, getAuthLogout } = require('../controllers/login');

const loginRouter = new Router();

loginRouter.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }));
loginRouter.get('/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/api/auth/fail' }));
loginRouter.get('/fail', getAuthFail);
loginRouter.get('/logout', getAuthLogout);

module.exports = loginRouter;
