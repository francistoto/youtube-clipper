const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const passport = require('./controllers/passport');

const { checkAuthentication } = require('./lib/middleware');

/**
 * Import routes
 */
const loginRouter = require('./routes/login');
const channelsRouter = require('./routes/channels');
const usersRouter = require('./routes/users');
const momentsRouter = require('./routes/moments');

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
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use(session({
            secret: process.env.SESSION_SECRET || 'funnyMonkey',
            resave: false,
            saveUninitialized: true
        }));

        this.app.use(passport.initialize());
        this.app.use(passport.session());

        this.app.set('trust_proxy', 1);
    }

    mountRoutes() {
        const rootRouter = express.Router();

        // Default route for testing basic server health
        rootRouter.get('/', (req, res) => {
            res.status(200).send({ message: 'Hello World!' });
        });

        this.app.use('/api', rootRouter);
        this.app.use('/api/auth', loginRouter);
        this.app.use('/api/users', checkAuthentication, usersRouter);
        this.app.use('/api/channels', checkAuthentication, channelsRouter);
        this.app.use('/api/moments', checkAuthentication, momentsRouter);
    }
}

module.exports = App
