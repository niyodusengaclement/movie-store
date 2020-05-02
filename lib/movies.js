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
        this.db.all(`select id, title, genres, ROUND(AVG(rating), 1) as averageRating, ratingCount from (select movies.movieId as id, ratings.rating as rating, movies.title as title, movies.genres as genres, COUNT(ratings.movieId) as ratingCount from movies, ratings WHERE movies.movieId = ratings.movieId GROUP BY ratings.movieId HAVING ratingCount >= 20) GROUP BY id ORDER BY ROUND(AVG(rating), 1) DESC`, cb);
    }

    getMoviesByGenre(genre, cb) {
        // TODO: implement this method to return movies of a specified genre
        // I used "LIKE" to return all movies that has speciefed genre even tho it might have more than one genre  

        this.db.all(`SELECT id, title, genres, ROUND(AVG(rating), 1) as averageRating, ratingCount from (select movies.movieId as id, ratings.rating as rating, movies.title as title, movies.genres as genres, COUNT(ratings.movieId) as ratingCount from movies, ratings WHERE movies.movieId = ratings.movieId AND movies.genres LIKE '%${genre}%' GROUP BY ratings.movieId HAVING ratingCount >= 20) GROUP BY id ORDER BY ROUND(AVG(rating), 1) DESC`, cb);
    }

    getMovieDetails(movie, cb) {
        // this.db.all(`SELECT rating, timestamp FROM ratings where ratings.movieId = ${movie} ORDER BY timestamp DESC limit 5`, cb);
        this.db.all(`SELECT title, genres, rating, timestamp FROM ratings JOIN movies ON ratings.movieId = movies.movieId AND ratings.movieId = ${movie} ORDER BY timestamp DESC limit 5`, cb);
    }


};
