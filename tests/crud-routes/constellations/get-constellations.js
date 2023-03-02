require('module-alias/register');
const request = require('supertest');
const {start, finish} = require('../../mocks/app');
const Constellation = require('@models/constellation');
require('should');

describe('GET /api/constellations', () => {
    let application;

    before((done) => {
        start()
            .then((app) => {
                application = app;
                Constellation.deleteMany({});
                return Promise.all([
                    Constellation.create({
                        name: 'Aquarius',
                        description: 'Aquarius is a constellation'
                    }),
                    Constellation.create({
                        name: 'Geminis',
                        description: 'Geminis is another constellation'
                    })
                ]);
            })
            .then(() => {
                done();
            })
            .catch(() => {
                done();
            });
    });

    after(() => {
        return Constellation.deleteMany({})
            .then(() => {
                finish();
            });
    });

    it('It should get all constellations', () => {
        return request(application)
            .get('/api/constellations')
            .expect(200)
            .then((response) => {
                response.body.data.should.have.length(2);

                response.body.data.should.have.containDeep([
                    {
                        name: 'Aquarius',
                        description: 'Aquarius is a constellation'
                    },
                    {
                        name: 'Geminis',
                        description: 'Geminis is another constellation'
                    }
                ]);
            });
    });
});
