let express = require('express');
let router = express.Router();

const path = require('path');
const MovieService = require('../lib/movies');
const movieService = new MovieService(path.join(__dirname, '..', 'movies.db'));
const onError = require('../lib/response');

router.get('/movies/all', function(req, res) {
  try {
    movieService.getAllMovies((err, movies) => {
      if(err) {
        console.log(err);
      }
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
    movieService.getMovieDetails(req.params.id, (err, movie) => {
      if(!movie) {
        return onError(res, 404, 'Movie not found');
      }
      return res.status(200).json(movie);
    });
  } catch(err) {
    return onError(res, 500, 'Internal Server Error');
  }
});

module.exports = router;
