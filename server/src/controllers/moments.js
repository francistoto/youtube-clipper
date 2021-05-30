const { channel: Channel, moment: Moment, user: User, video: Video } = require('../db/models');

module.exports = {
    createMoment: async (req, res) => {
        const { moment: newMoment, user: { id } } = req.body;

        try {
            const moment = await Moment.create(newMoment);
            await moment.addUser(user.id);
        
            res.status(200).send(moment);
        } catch (error) {
            res.status(400).send(error);
        }
    }
};
