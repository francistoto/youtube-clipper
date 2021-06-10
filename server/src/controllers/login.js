module.exports = {
    getAuthFail: (req, res) => {
        res.status(401).send({ error: 'Authentication failed' });
    },
    getAuthLogout: (req, res) => {
        req.logout();

        res.status(205).send();
    }
};
