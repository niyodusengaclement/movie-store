# One Movie Fund code test

Welcome to our code test!

## Project Overview

This project is a simple web application showing a list of movies (downloaded from the free [MovieLens](https://grouplens.org/datasets/movielens/) dataset).

It uses the following libraries / technologies - don't hesitate to refer to the docs if you need to:

* [SQLite](https://sqlite.org/index.html) as a simple file database with all the movie data
* [NodeJS](https://nodejs.org/en/) to run the web server, and more specifically:
  * [Express](http://expressjs.com/) as web / routing framework
  * [Handlebars](https://handlebarsjs.com/) as simple HTML templating engine
* [Bootstrap](https://getbootstrap.com/) and [jQuery](https://jquery.com/) for the client-side web pages
* [Mocha](https://mochajs.org/) as test framework, with the [chai](https://www.chaijs.com/) assertion library and [chai-http](https://www.chaijs.com/plugins/chai-http/) plugin used for the HTTP tests

## Project Structure

Here's the (simplified) project structure:

```text
project
├── README.md
├── app.js              --> the main app
├── movies.db           --> the SQLite movie database
├── lib
│   └── movies.js       --> the main business logic handling movie information, as a plain NodeJS Module
├── routes
│   ├── api.js          --> the Express routes for the REST API layer exposing the movie logic
│   └── index.js        --> the Express routes for the server-side HTML page rendering
├── views
│   ├── index.hbs       --> the template for all movie list pages
│   └── index.js        --> the template for the general site layout
├── public              --> exposed by the web server on the root /
│   └── stylesheets
│       └── style.css   --> the site's custom styles
└── tests
    ├── movies.unit.test.js       --> unit tests for the movies lib
    └── api.test.js    --> API tests
```

## Database structure

The sqlite database in `movies.db` contains the two following tables (you can browse it with the free [SQLite browser](https://sqlitebrowser.org/) for instance):

### movies

```sql
CREATE TABLE "movies" (
    "movieId"   INTEGER NOT NULL UNIQUE,
    "title"     TEXT NOT NULL,
    "genres"    TEXT,
    PRIMARY KEY("movieId")
);
```

The genres are stored as a `|`-separated list of strings.

### ratings

```sql
CREATE TABLE "ratings" (
    "userId"     INTEGER,
    "movieId"    INTEGER,
    "rating"     REAL,
    "timestamp"  INTEGER
);
```

## REST API

The following REST API is currently implemented:

* `GET /rest/movies/all`

```json
[
  {
    "title": "Black Butler: Book of the Atlantic (2017)",
    "genres": "Action|Animation|Comedy|Fantasy"
  },
  {
    "title": "No Game No Life: Zero (2017)",
    "genres": "Animation|Comedy|Fantasy"
  },
  {
    "title": "Flint (2017)",
    "genres": "Drama"
  },
  {
    "title": "Bungo Stray Dogs: Dead Apple (2018)",
    "genres": "Action|Animation"
  },
  {
    "title": "Andrew Dice Clay: Dice Rules (1991)",
    "genres": "Comedy"
  }
]
```

## How to run and test

### Run the app

* Install the dependencies: `npm install`
* Run: `npm start` or directly `node app.js`. It uses port 3000 by default but you can change this with the `PORT` environment variable, e.g. `PORT=3001 npm start`
* Open the web UI with your browser at <http://localhost:3000/>

### Run the tests

* Install the dev dependencies: `npm install --dev-dependencies`
* Run: `npm test` or directly `mocha tests`. It will execute all tests under the `./tests` directory, but you can run a specific test file with e.g. `mocha tests/movies.unit.test.js`

## Exercises

### Database and web app

* Improve the movie service (`lib/movies.js`), REST API (`/routes/api.js`) and UI (`views/index.hbs`) as needed in order to achieve the following:
  * Return the list of genres as an array, and display them as separate labels (e.g. using Bootstrap `badge` components) in the same table column
  * Return the average rating of each movie in a property called `averageRating`, rounded to 1 decimal place, and display them in a separate table column
  * Only include movies with at least 20 ratings
  * Return the movies sorted by descending rating

The expected format for a single movie record would then be something like (imaginary values, not necessarily accurate):

```json
{
  "title": "Black Butler: Book of the Atlantic (2017)",
  "genres": ["Action","Animation","Comedy","Fantasy"],
  "averageRating": 4.6
}
```

* Implement the `getMoviesByGenre` method and the corresponding `GET /rest/movies/byGenre/[GENRE]` REST API to return the same data as above, filtered for movies of the given genre
* __BONUS__ Implement a movie details page at `/movie/:id` displaying the last 5 ratings for that movie and their date, and make the movie titles in the main pages clickable to access the details page

### Tests

* Create new unit and API tests to cover your new developments in new `*.test.js` files under the `tests` directory. Feel free to take inspiration from the provided sample test files but do __NOT__ modify these
* __BONUS__ Use the framework of your choice to produce a test coverage report and save it to a file in the `coverage` directory, showing at least the %lines covered. You should commit the resulting report files (it may be ignored by default by Git). Please specify the command to run in the `scripts` section of your `package.json`, to be run with `npm run coverage`.
* __BONUS__ Use the test framework of your choice to implement an integrated UI test that will:
  * Open the landing page and wait for the table data to be loaded
  * Verify that the main table has entries
  * Verify that all entries have a rating
  * If possible, have these tests run via mocha using the `mocha tests` command. If not, specify the command to run in the `scripts` section of your `package.json`, to be run with `npm run test-ui`.

## Submission

Simply commit and push your updates using regular Git commands. We expect updates at least to the following files:

* `lib/movies.js`
* `routes/api.js`
* `views/index.hbs`
* `tests/XXXX.test.js` - but please do __NOT__ update existing test files

You may install external NodeJS libraries if you wish, in that case:

* Please make sure these dependencies are added to the repo's `package.json`
* But do __NOT__ remove any of the dependencies already declared

## Submitting your solution

Please push your changes to the `master branch` of this repository. You can push one or more commits. <br>

Once you are finished with the task, please click the `Complete task` link on <a href="https://app.codescreen.dev/#/codescreentesta82e6ddf-8bdc-4bd8-b613-c5216a68c7d1" target="_blank">this screen</a>.