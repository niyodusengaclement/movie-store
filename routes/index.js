let express = require('express');
let router = express.Router();

const MovieService = require('../lib/movies');

router.get(['/', '/genre/:genre'], function(req, res) {
  res.render('index', {
    title: 'One Movie Fund' + (req.params.genre ? ` - ${req.params.genre}` : ''),
    selectedGenre : req.params.genre,
    genres: MovieService.getGenres(),
  });
});

module.exports = router;
