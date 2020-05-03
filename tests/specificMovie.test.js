// To disable HTTP logs
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Get Specific Movie unit testing suite', () => {
    let app, server;
    
    before('starting the server', () => {
        app = require('../app');
        server = chai.request(app).keepOpen();
    });

    it('should GET a specific movie', (done) => {
        server
            .get('/rest/movie/3')
            .end((err, res) => {
                expect(res.status).to.eql(200);
                expect(res.body).to.be.an('object');
                done();
            });
    });

    it('should return 404 error if No entries found', (done) => {
        server
            .get('/rest/movie/3047458888454')
            .end((err, res) => {
                expect(res.status).to.eql(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('error', 'Movie not found');
                done();
            });
    });

    it('should return 400  if movie ID is not a number', (done) => {
        server
            .get('/rest/movie/0')
            .end((err, res) => {
                expect(res.status).to.eql(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('error');
                done();
            });
    });

    after('Closing the server', () => {
        server.close();
    });
});
