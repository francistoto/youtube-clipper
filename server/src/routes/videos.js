const { Router } = require('express');

const { createVideos, deleteVideo } = require('../controllers/videos');

const videosRouter = new Router();

videosRouter.get('/channel/:channelId');
videosRouter.post('/create', createVideos);
videosRouter.delete('/', deleteVideo);

module.exports = videosRouter;
