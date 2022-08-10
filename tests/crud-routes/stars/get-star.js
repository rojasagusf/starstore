require('module-alias/register');
const app = require('../../mocks/app');
const request = require('supertest');
const {Star} = require('@models');
require('should');

describe('GET /stars', () => {
    let application;

    before(() => {
        return app.start()
            .then((app) => {
                application = app;
                return Promise.all([
                    Star.create({
                        name: 'Aquarius Star',
                        location: 'Aquarius',
                        price: 4000
                    }),
                    Star.create({
                        name: 'Geminis Star',
                        location: 'Geminis',
                        price: 2000
                    })
                ]);
            })
            .catch((error) => {
                console.log(error);
            });
    });

    after(() => {
        Star.deleteMany({})
            .then(() => {
                app.finish();
            });
    });

    it('Should get all stars', () => {
        request(application)
            .get('/api/stars')
            .expect(200)
            .then((response) => {
                console.log('sad', response);
                response.body.should.have.length(24);

                response[0].body.name.should.be.equal('Aquasdarius Star');
                response[0].body.location.should.be.equal('Aquarius');
                response[0].body.price.should.be.equal(4000);

                response[1].body.name.should.be.equal('Geminasdis Star');
                response[1].body.location.should.be.equal('Geminais');
                response[1].body.price.should.be.equal(2000);
            });
    });
});

