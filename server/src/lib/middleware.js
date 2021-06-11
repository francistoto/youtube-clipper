const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'funnyMonkey';

module.exports = {
    checkAuthentication: (req, res, next) => {
        if (req.method === 'OPTIONS') {
            next();
        }

        if (req.isAuthenticated()) {
            next();
        } else {
            res.sendStatus(401);
        }
    }
};
