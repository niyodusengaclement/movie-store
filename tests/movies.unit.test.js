const assert = require('chai').assert;
const path = require('path');
const MovieService = require('../lib/movies');
const movieService = new MovieService(path.join(__dirname, '..', 'movies.db'));


describe("Movies unit tests", () => {
    it("should return many movies", (done) => {
        movieService.getAllMovies((err,movies) => {
            assert.isAbove(movies.length, 1000);
            done();
        });
    });
});
