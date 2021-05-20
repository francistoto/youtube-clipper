const request = require('supertest');
const express = require('express');
const sinon = require('sinon');

const App = require('../app');

let server;

beforeAll(() => {
    server = new App().app;
});

describe('GET /api', () => {
    test('It should return a JSON object with message "Hello World!"', async () => {
        const res = await request(server).get('/api');

        expect(res.status).toEqual(200);
        expect(res.body).toEqual({ message: 'Hello World!' });
    });
});
