module.exports = {
    checkAuthentication: (req, res, next) => {
        if (req.isAuthenticated() || req.method === 'OPTIONS') {
            return next();
        } else {
            return res.status(401).send({
                authenticated: false,
                message: 'no user logged in'
            });
        }
    }
}