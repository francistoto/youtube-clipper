const { channel: Channel, moment: Moment, user: User, video: Video } = require('../db/models');

module.exports = {
    createMoment: async (req, res) => {
        const { newMoment } = req.body;

        console.log('newMoment: ', newMoment);

        try {
            const moment = await Moment.create(newMoment);
            await moment.addUser(newMoment.createdByUser);
        
            res.status(200).send(moment);
        } catch (error) {
            res.status(400).send(error);
        }
    }
};
