const request = require('supertest');
const express = require('express');
const path = require('path');

// db setup
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/prototype4-test', {useNewUrlParser: true});
require('../app/models/results');
require('../app/models/users');

const router  = require('../app/routes/results');
const app = new express();
app.use('/results', router);
app.set('views', path.join(__dirname, '../', 'app', 'views'));
app.set('view engine', 'pug');

describe('Results routes', () => {

    // 'login' to get through auth middleware
    let token;
    beforeEach((done) => {
        request(app).post('/auth/login')
        .send({
            email: 'example@example.com',
            password: 'password',
        })
        .end((err, res) => {
            if (err) throw err;
            token = { access_token: res.body.token }
            done();
        });
    });
    
    test('GET /', (done) => {
        request(app).get('/')
        .query(token)
        .expect('text/html; charset=utf-8')
        .expect(200)
        .end((err, res) => {
            done()
        });
    });

});
