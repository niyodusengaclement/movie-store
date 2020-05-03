// To disable HTTP logs
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Get movies by Genre unit testing suite', () => {
    let app, server;
    
    before('starting the server', () => {
        app = require('../app');
        server = chai.request(app).keepOpen();
    });

    it('should GET movies by Genre', (done) => {
        server
            .get('/rest/movies/byGenre/Fantasy')
            .end((err, res) => {
                expect(res.status).to.eql(200);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.be.above(10);
                done();
            });
    });

    it('should return 404 error if No entries found', (done) => {
        server
            .get('/rest/movies/byGenre/UnknownGenre')
            .end((err, res) => {
                expect(res.status).to.eql(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('error', 'No entries found');
                done();
            });
    });

    after('Closing the server', () => {
        server.close();
    });
});
