const { Router } = require('express');

const { getUserById, createUserForRoute: createUser, getCurrentUser } = require('../controllers/users');

const usersRouter = new Router();

usersRouter.get('/id/:id', getUserById);
usersRouter.post('/create', createUser);
usersRouter.get('/current', getCurrentUser);

module.exports = usersRouter;
