const request = require('supertest');
const express = require('express');
const path = require('path');
const router  = require('../app/routes/index');

const app = new express();

app.use('/', router);
app.set('views', path.join(__dirname, '../', 'app', 'views'));
app.set('view engine', 'pug');

describe('Main routes', () => {

    // no auth needed for about
    test('GET /about', (done) => {
        request(app).get('/about')
        .expect('text/html; charset=utf-8')
        .expect(200)
        .end((err, res) => {
            done()
        });
    })

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

    test('GET /challenge', (done) => {
        request(app).get('/challenge')
        .query(token)
        .expect('text/html; charset=utf-8')
        .expect(200)
        .end((err, res) => {
            done()
        });
    });

    test('GET /challenge/results', (done) => {
        request(app).get('/challenge')
        .query(token)
        .expect('text/html; charset=utf-8')
        .expect(200)
        .end((err, res) => {
            done()
        });
    });
});
