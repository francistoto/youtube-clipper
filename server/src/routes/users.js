const { Router } = require('express');

const { getUser, createUser } = require('../controllers/users');

const usersRouter = new Router();

usersRouter.get('/:id', getUser);
usersRouter.post('/create', createUser);

module.exports = usersRouter;
