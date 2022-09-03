require('module-alias/register');
const app = require('../../mocks/app');
const request = require('supertest');
const User = require('@models/user');
require('should');

describe('GET /users', () => {
    let application;

    before((done) => {
        app.start()
            .then((app) => {
                application = app;
                return User.deleteMany({});
            })
            .then(() => {
                return User.create({
                    name: 'user',
                    lastName: 'prueba',
                    email: 'user@prueba.com',
                    password: 'password',
                    phone: 112233445566,
                });
            })
            .then(() => {
                done();
            })
            .catch(() => {
                done();
            });
    });

    after(() => {
        User.deleteMany({})
            .then(() => {
                app.finish();
            });
    });

    it('Should get all users', () => {
        return request(application)
            .get('/api/users')
            .expect(200)
            .then((response) => {
                response.body.should.have.length(1);

                response.body[0].name.should.be.equal('user');
                response.body[0].lastName.should.be.equal('prueba');
                response.body[0].email.should.be.equal('user@prueba.com');
                response.body[0].password.should.be.equal('password');
                response.body[0].phone.should.be.equal(112233445566);
            });
    });
});