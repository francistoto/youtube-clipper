const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const usersRouter = require('./routes/users');

class App {
    constructor() {
        this.app = express();

        this.config();
        this.mountRoutes();
    }

    config() {
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(express.urlencoded({ extended: false }));

        this.app.use(session({
            secret: 'funnyMonkey',
            resave: false,
            saveUninitialized: true
        }));

        this.app.set('trust_proxy', 1);
    }

    mountRoutes() {
        const rootRouter = express.Router();

        rootRouter.get('/', (req, res) => {
            res.status(200).send({ message: 'Hello World!' });
        });

        this.app.use('/api', rootRouter);
        this.app.use('/api/users', usersRouter);
    }
}

module.exports = App
