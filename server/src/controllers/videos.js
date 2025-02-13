const { video: Video } = require('../db/models');

module.exports = {
    getVideosByChannel: async (req, res) => {
        const { channelId } = req.params;

        try {
            const videos = await Video.findAll({
                where: { channelId },
                order: [
                    ['id', 'ASC']
                ]
            });

            res.status(200).send(videos);
        } catch (error) {
            res.status(404).send();
        }
    },
    createVideos: async (req, res) => {
        const { newVideos } = req.body;

        try {
            const videos = await Video.bulkCreate(newVideos);

            res.status(200).send(videos);
        } catch (error) {
            res.status(401).send();
        }
    },
    deleteVideo: async (req, res) => {
        const { videoId } = req.body;

        try {
            const video = await Video.findOne({
                where: {
                    id: videoId
                }
            });
    
            await video.destroy();
    
            res.status(200).send({ message: `Video ${videoId} deleted.`})
        } catch(error) {
            res.status(404).send(error.message);
        }
    }
};
