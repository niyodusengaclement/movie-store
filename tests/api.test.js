// To disable HTTP logs
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);


describe('Movies API', () => {
    let app, server;
    
    before('staring server', function() {
        app = require('../app');
        server = chai.request(app).keepOpen();
    });

    it('should GET all movies', (done) => {
        server
            .get('/rest/movies/all')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('array');
                expect(res.body.length).to.be.above(10);
                done();
            });
    });

    after('closing server', function() {
        server.close();
    });
});
