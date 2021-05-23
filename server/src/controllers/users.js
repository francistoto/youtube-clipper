const { channel: Channel, user: User } = require('../db/models');
const _ = require('lodash');

module.exports = {
    getUser: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await User.findOne({
                where: {
                    id
                },
                attributes: [
                    'id',
                    'firstName',
                    'lastName',
                    'email'
                ],
                include: [
                    {
                        model: Channel,
                        attributes: [
                            'id',
                            'name',
                            'background'
                        ]
                    }
                ]
            });

            if (user) {
                res.status(200).send(user);
            } else {
                res.status(404);
                throw new Error(`User not found!`);
            }
        } catch(error) {
            res.send(error);
        }
    },
    createUser: async (req, res) => {
        const newUser = req.body;

        try {
            const user = await User.create(newUser);
        
            if (user) {
                res.status(200).send(user);
            } else {
                res.status(404);
                throw new Error('Failed to create user.');
            }
        } catch (error) {
            res.send(error);
        }
    }
}