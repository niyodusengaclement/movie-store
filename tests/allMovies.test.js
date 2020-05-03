// To disable HTTP logs
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('All Movies unit testing suite', () => {
    let app, server;
    
    before('starting the server', () => {
        app = require('../app');
        server = chai.request(app).keepOpen();
    });

    it('should GET all stored movies', (done) => {
        server
            .get('/rest/movies/all')
            .end((err, res) => {
                expect(res.status).to.eql(200);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.be.above(1000);
                done();
            });
    });

    after('Closing the server', () => {
        server.close();
    });
});
