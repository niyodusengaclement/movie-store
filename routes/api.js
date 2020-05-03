let express = require('express');
let router = express.Router();
const hbs = require('hbs');
const path = require('path');
const MovieService = require('../lib/movies');
const movieService = new MovieService(path.join(__dirname, '..', 'movies.db'));
const onError = require('../lib/response');
require('../lib/hbsHelper')(hbs);

router.get('/movies/all', function(req, res) {
  try {
    movieService.getAllMovies((err, movies) => {
      res.status(200).json(movies);
    });

  } catch(err) {
    return onError(res, 500, 'Internal Server Error');
  }
});

router.get('/movies/byGenre/:genre', function(req, res) {
  try {
    movieService.getMoviesByGenre(req.params.genre, (err, movies) =>  {
      if(movies.length > 0) {
        return res.status(200).json(movies);
      }
      return onError(res, 404, 'No entries found');
    });

  } catch(err) {
    return onError(res, 500, 'Internal Server Error');
  }
});

router.get('/movie/:id', function(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    if(isNaN(id) || id < 1){
      return onError(res, 400, 'Movie Id Should be Number which is not less than 1');
    }
    movieService.getMovieDetails(id, (err, movie) => {
      if(!movie || movie.length < 1) {
        return onError(res, 404, 'Movie not found');
      }
      
      const { title, genres } = movie[0];

      const movieDetails = movie;

      // try to render data
      res.render('details', {
        title: `One Movie Fund - ${title}`,
        selectedMovie: title,
        genres: MovieService.getGenres(),
        movieDetails,
        movieGenre: genres,
      });
    });
  } catch(err) {
    return onError(res, 500, 'Internal Server Error');
  }
});

module.exports = router;
