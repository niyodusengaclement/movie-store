// To disable HTTP logs
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = require('chai').assert;
const path = require('path');
const MovieService = require('../lib/movies');
const movieService = new MovieService(path.join(__dirname, '..', 'movies.db'));

chai.use(chaiHttp);

describe('Endpoints unit test suite', () => {
    let app, server;
    
    before('starting the server', function() {
        app = require('../app');
        server = chai.request(app).keepOpen();
    });

    it('should GET movies by Genre', (done) => {
        server
            .get('/rest/movies/byGenre/Fantasy')
            .end((err, res) => {
                expect(res).to.eql(200);
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

    it('Should return 500 error if server get an error', (done) => {
        server
        .get('/rest/movies/byGenre/Fantasy')
        .end((err, res) => {
            new Error();
            expect(res.status).to.eql(500);
            return done();
        });
    });

    after('Closing the server', function() {
        server.close();
    });
});
