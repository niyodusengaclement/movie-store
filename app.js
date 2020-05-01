let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let http = require('http');
let morgan = require('morgan');

let indexRouter = require('./routes/index');
let apiRouter = require('./routes/api');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Express config
if(process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes
app.use('/', indexRouter);
app.use('/rest', apiRouter);

let port = parseInt(process.env.PORT || '3000');

// Start server
let server = http.createServer(app);
server.on('error', error => {
  console.error(error);
  process.exit(1);
});
server.on('listening', () => {
  console.log(`Listening on ${server.address().port}`);
});

if(process.env.NODE_ENV !== 'test') {
  // Don't start in test mode, let mocha control the listen / close
  server.listen(port);
}

module.exports = server; // export it for testing
