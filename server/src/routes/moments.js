const { Router } = require('express');

const { createMoment } = require('../controllers/moments');

const momentsRouter = new Router();

momentsRouter.post('/create', createMoment);

module.exports = momentsRouter;
