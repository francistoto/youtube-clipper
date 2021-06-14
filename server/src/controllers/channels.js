const { channel: Channel, moment: Moment, user: User, video: Video } = require('../db/models');

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
                        order: [
                            ['id', 'DESC']
                        ],
                        attributes: [
                            'id',
                            'url'
                        ],
                        include: {
                            model: Moment,
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

            res.status(200).send(channel);
        } catch(error) {
            console.error('error: ', error);
            res.status(404).send(error);
        }
    },
    getChannelsByUserId: async (req, res) => {
        const { userId } = req.params;
        try {
            const channel = await Channel.findAll({
                where: {
                    userId
                },
                order: [
                    ['id', 'ASC']
                ],
                include: [
                    {
                        model: Video,
                        attributes: [
                            'id',
                            'url',
                            'title',
                            'thumbnail',
                            'platform'
                        ]
                    }
                ]
            });

            if (channel) {
                res.status(200).send(channel);
            } else {
                res.status(404);
                throw new Error(`Channel not found!`);
            }
        } catch(error) {
            res.send(error);
        }
    },
    createChannel: async (req, res) => {
        const newChannel = req.body;

        try {
            const channel = await Channel.create(newChannel);
        
            if (channel) {
                res.status(200).send(channel);
            } else {
                throw new Error('Failed to create Channel');
            }
        } catch (error) {
            res.status(404).send(error);
        }
    },
    deleteChannel: async (req, res) => {
        const { channelId } = req.body;

        try {
            const channel = await Channel.findOne({
                where: {
                    id: channelId
                }
            });
    
            await channel.destroy();
    
            res.status(200).send({ message: `Channel ${channelId} deleted.`})
        } catch(error) {
            res.status(404).send(error.message);
        }
    }
};
