const { Router } = require('express');

const { searchVideos } = require('../controllers/youtube');

const youtubeRouter = new Router();

youtubeRouter.post('/search', searchVideos);

module.exports = youtubeRouter;
