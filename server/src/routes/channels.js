const { Router } = require('express');

const { getChannel, createChannel } = require('../controllers/channels');

const channelRouter = new Router();

channelRouter.get('/:id', getChannel);
channelRouter.post('/create', createChannel);

module.exports = channelRouter;
