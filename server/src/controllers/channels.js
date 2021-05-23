const { channel: Channel, like: Like, user: User, video: Video } = require('../db/models');

module.exports = {
    getChannel: async (req, res) => {
        const { id } = req.params;
        try {
            const channel = await Channel.findOne({
                where: {
                    id
                },
                include: [
                    {
                        model: Video,
                        attributes: [
                            'id',
                            'url'
                        ],
                        include: {
                            model: Like,
                            attributes: [
                                'id',
                                'startTime',
                                'stopTime',
                                'videoId',
                                'channelId'
                            ],
                            include: {
                                model: User,
                                attributes: [
                                    'id',
                                    'firstName',
                                    'lastName',
                                    'email'
                                ]
                            }
                        }
                    }
                ]
            });

            if (channel) {
                res.status(200).send({ message: 'success', data: channel });
            } else {
                res.status(404);
                throw new Error(`Channel not found!`);
            }
        } catch(error) {
            const { message } = error;
            res.send({ message });
        }
    },
    createChannel: async (req, res) => {
        const newChannel = req.body;

        try {
            const channel = await Channel.create(newChannel);
        
            if (channel) {
                res.status(200).send({ message: `success`, data: channel });
            } else {
                res.status(404);
                throw new Error('Failed to create Channel');
            }
        } catch (error) {
            const { message } = error;
            res.send({ message });
        }
    }
};
