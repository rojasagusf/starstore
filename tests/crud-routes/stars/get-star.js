require('module-alias/register');
const app = require('../../mocks/app');
const request = require('supertest');
const {Star, Constellation} = require('@models');
require('should');

describe('GET /stars', () => {
    let application;

    before((done) => {
        app.start()
            .then((app) => {
                application = app;
                return Star.deleteMany({});
            })
            .then(() => {

                return Promise.all([
                    Constellation.create({
                        _id: '00000000000000aabb000310',
                        name: 'First Constellation',
                        description: 'A constellation'
                    }),
                    Constellation.create({
                        _id: '00000000000000aabb000315',
                        name: 'Second Constellation',
                        description: 'A constellation'
                    })
                ])
                    .then(() => {
                        Star.create({
                            _id: '00000000000000aabb000313',
                            name: 'Aquarius Star',
                            constellation: '00000000000000aabb000310',
                            magnitude: 12,
                            distance: 197,
                            description: 'A star of aquarius',
                            price: 4000
                        })
                            .then(() => { 
                                Star.create({
                                    _id: '00000000000000aabb000314',
                                    name: 'Geminis Star',
                                    constellation: '00000000000000aabb000311',
                                    magnitude: 9,
                                    distance: 203,
                                    description: 'A star of geminis',
                                    price: 2000
                                });
                            });
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
        Promise.all([
            Star.deleteMany([]),
            Constellation.deleteMany({})
        ])
            .then(() => {
                return app.finish();
            });
    });

    it('Should get all stars', () => {
        return request(application)
            .get('/api/stars')
            .expect(200)
            .then((response) => {
                response.body.data.should.have.length(2);

                response.body.data[0].name.should.be.equal('Aquarius Star');
                response.body.data[0].constellation.should.be.equal('00000000000000aabb000310');
                response.body.data[0].magnitude.should.be.equal('12');
                response.body.data[0].distance.should.be.equal('197');
                response.body.data[0].description.should.be.equal('A star of aquarius');
                response.body.data[0].price.should.be.equal(4000);

                response.body.data[1].name.should.be.equal('Geminis Star');
                response.body.data[1].constellation.should.be.equal('00000000000000aabb000311');
                response.body.data[1].magnitude.should.be.equal('9');
                response.body.data[1].distance.should.be.equal('203');
                response.body.data[1].description.should.be.equal('A star of geminis');
                response.body.data[1].price.should.be.equal(2000);
                
            });
    });

    it('Should get one star by id', () => {
        return request(application)
            .get('/api/stars/00000000000000aabb000313')
            .expect(200)
            .then((response) => {
                response.body.data.name.should.be.equal('Aquarius Star');
                response.body.data.constellation.should.be.equal('00000000000000aabb000310');
                response.body.data.magnitude.should.be.equal('12');
                response.body.data.distance.should.be.equal('197');
                response.body.data.description.should.be.equal('A star of aquarius');
                response.body.data.price.should.be.equal(4000);
            });
    });

    it('Should create a star', () => {
        return request(application)
            .post('/api/stars')
            .send({
                name: 'Leo',
                constellation: '00000000000000aabb000315',
                magnitude: '20',
                distance: '200',
                description: 'A star of leo',
                price: 3000
            })
            .expect(200)
            .then((response) => {
                response.body.data.name.should.be.equal('Leo');
                response.body.data.constellation.should.be.equal('00000000000000aabb000315');
                response.body.data.magnitude.should.be.equal('20');
                response.body.data.distance.should.be.equal('200');
                response.body.data.description.should.be.equal('A star of leo');
                response.body.data.price.should.be.equal(3000);
            });
    });
});

