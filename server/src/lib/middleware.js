const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'funnyMonkey';

module.exports = {
    checkAuthentication: (req, res, next) => {
        if (req.method === 'OPTIONS') {
            next();
        }

        console.log('req.headers: ', req.headers);

        if (req.headers['authorization']) {
            const jwt_token = req.headers['authorization'].split(' ')[1];

            jwt.verify(jwt_token, JWT_SECRET_KEY, (err, authData) => {
                if (err) {
                    console.log('err: ', err);
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