const { Router } = require('express');

const { getChannel, createChannel, getChannelsByUserId, deleteChannel } = require('../controllers/channels');

const channelRouter = new Router();

channelRouter.get('/:id', getChannel);
channelRouter.get('/user/:userId', getChannelsByUserId);
channelRouter.post('/create', createChannel);
channelRouter.delete('/delete', deleteChannel);

module.exports = channelRouter;
