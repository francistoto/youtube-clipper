const { channel: Channel, user: User } = require('../db/models');
const _ = require('lodash');

module.exports = {
    getUserById: async (req, res) => {
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
    getUserByAuthId: async (authId) => {
        try {
            const user = await User.findOne({
                where: {
                    authId
                },
                attributes: [
                    'id',
                    'authId',
                    'displayName',
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
                return user
            } else {
                throw new Error(`User not found!`);
            }
        } catch(error) {
            console.error(error.message);
            return error;
        }
    },
    getCurrentUser: async (req, res) => {
        try {
            const { id } = req.user;
            const user = await User.findOne({
                where: {
                    id
                },
                attributes: [
                    'id',
                    'displayName',
                    'firstName',
                    'lastName',
                ]
            });

            res.status(200).send({
                authenticated: true,
                user
            });
        } catch (error) {
            res.status(401).send({ error: 'No user logged in' });
        }
    },
    createUser: async (newUser) => {
        const user = await User.create(newUser);

        return user;
    },
    createUserForRoute: async (req, res) => {
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