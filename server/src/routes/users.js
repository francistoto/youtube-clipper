const { Router } = require('express');

const { User } = require('../models');

const router = new Router();

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findAll({
            where: {
                id
            }
        });
        
        if (user.length !== 0) {
            res.status(200).send({ message: `User ID: ${id} found!`, data: user });
        } else {
            res.status(404);
            throw new Error(`User ID: ${id} not found!`);
        }
    } catch(error) {
        res.send(error.message);
    }
});

router.post('/create', async (req, res) => {
    const newUser = req.body;
    const user = await User.create(newUser);

    if (user) {
        res.status(200).send({ message: `User ID: ${user.id} created!`, data: user });
    } else {
        res.status(404).send({ message: `User not created!`, data: {} })
    }
});

module.exports = router;
