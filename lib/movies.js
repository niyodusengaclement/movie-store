const sqlite3 = require('sqlite3');

const ALL_GENRES = [
    "Action",
    "Adventure",
    "Animation",
    "Children",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Fantasy",
    "Film-Noir",
    "Horror",
    "IMAX",
    "Musical",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Thriller",
    "War",
    "Western",
];

module.exports = class MovieService {
    constructor(store) {
        this.store = store;
        this.db = new sqlite3.Database(this.store);
    }

    static getGenres() {
        return ALL_GENRES;
    }

    getAllMovies(cb) {
        // TODO: Return average ratings, and the movie genre as an array instead of a string
        this.db.all(`select movies.title, movies.genres from movies`, cb);
    }

    getMoviesByGenre(genre,cb) {
        // TODO: implement this method to return movies of a specified genre
        return cb(null,[]);
    }
};
