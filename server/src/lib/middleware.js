const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'funnyMonkey';

module.exports = {
    checkAuthentication: (req, res, next) => {
        if (req.method === 'OPTIONS') {
            next();
        }

        if (req.headers['authorization']) {
            const jwt_token = req.headers['authorization'].split(' ')[1];

            jwt.verify(jwt_token, JWT_SECRET_KEY, (err, authData) => {
                if (err) {
                    console.error('err: ', err);
                    res.status(403).json({ token: '' });
                } else {
                    next();
                }

            })
        } else {
            return res.status(403).json({
                authenticated: false,
                message: 'no jwt'
            });
        }

    }
}