const jwt = require('jsonwebtoken');
const { user: User } = require('../db/models');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'funnyMonkey';

module.exports = {
    getAuthSuccess: async (req, res) => {
        const { id } = req.user;

        jwt.sign(req.user, JWT_SECRET_KEY, async (err, token) => {
            if (err) {
                res.status(401).send(err);
            }

            await User.update({ token }, { where: { id } });
            
            res.redirect('/');
        });
    },
    getAuthFail: (req, res) => {
        res.status(401).send({ error: 'Authentication failed' });
    },
    getToken: async (req, res) => {
        if (req.isAuthenticated()) {
            const { id } = req.user;
            const { token } = await User.findOne({ where: { id } })

            jwt.verify(token, JWT_SECRET_KEY, (err, authData) => {
                if (err) {
                    res.status(401).send({ token: '' })
                } else {
                    res.status(200).send({ token });
                }
            });
        } else {
            res.sendStatus(403);
        }
    },
    verifyToken: async (req, res) => {
        jwt.verify(req.token, JWT_SECRET_KEY, (err, authData) => {
            if (err) {
                res.sendStatus(403);
            }

            res.status(200).send({ message: 'Verification successful', authData })
        })
    },
    getAuthLogout: (req, res) => {
        req.logout();

        res.status(205).send();
    }
};
