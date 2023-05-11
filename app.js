require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const MongoStore = require('connect-mongo');

require('./app/config/db');
require('./app/config/passport');

const indexRouter = require('./app/routes/main');
const resultsRouter = require('./app/routes/results');
const authRouter = require('./app/routes/auth');
const testRouter = require('./app/routes/test');
const studentsRouter = require('./app/routes/students');

const app = express();

// hide web technology
app.disable("x-powered-by");

// view engine setup
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());

let dbURI = 'mongodb://localhost/prototype4';
if (process.env.NODE_ENV === 'production') {
    dbURI = `mongodb+srv://penguin0001:${process.env.DB_PW}@prototype4.cdcwbcv.mongodb.net/?retryWrites=true&w=majority`;
}

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: dbURI} )
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/results', resultsRouter);
app.use('/auth', authRouter);
app.use('/test', testRouter);
app.use('/students', studentsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
