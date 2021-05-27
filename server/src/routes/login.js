const { Router } = require('express');

const passport = require('../controllers/passport');

const loginRouter = new Router();

loginRouter.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }));
loginRouter.get('/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/api/auth/fail' }));
loginRouter.get('/fail', (req, res) => {
    res.status(401).send({ error: 'Authentication failed' });
});

module.exports = loginRouter;
