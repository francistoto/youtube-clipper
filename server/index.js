const http = require('http');

const App = require('./src/app');

const app = new App().app;

http.createServer(app).listen(3000);
