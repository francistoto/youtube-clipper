const { Router } = require('express');

const { getChannel, createChannel, getChannelsByUserId } = require('../controllers/channels');

const channelRouter = new Router();

channelRouter.get('/:id', getChannel);
channelRouter.get('/user/:userId', getChannelsByUserId);
channelRouter.post('/create', createChannel);

module.exports = channelRouter;
