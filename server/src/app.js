const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

/**
 * Import routes
 */
const channelsRouter = require('./routes/channels');
const usersRouter = require('./routes/users');

/**
 * Main server app
 */
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

        // Default route for testing basic server health
        rootRouter.get('/', (req, res) => {
            res.status(200).send({ message: 'Hello World!' });
        });

        this.app.use('/api', rootRouter);
        this.app.use('/api/users', usersRouter);
        this.app.use('/api/channels', channelsRouter);
    }
}

module.exports = App
