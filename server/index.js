const http = require('http');

const App = require('./src/app');

const API_PORT = process.env.API_PORT || 8081;

const app = new App().app;

http.createServer(app).listen(API_PORT, (error) => {
    if (error) {
        return console.error(error);
    }

    return console.log(`Listening on port ${API_PORT}`);
});
