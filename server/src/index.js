const express = require('express');
const http = require('http');
// const session = require('express-session');

const usersRoutes = require('./routes/users');

const app = express();

app.use(express.json());
// app.use(session({secret: "funnyMonkey"}));

app.use('/api/users', usersRoutes);

http.createServer(app).listen(3000);
