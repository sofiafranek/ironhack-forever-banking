'use strict';

const { join } = require('path');
const express = require('express');
const createError = require('http-errors');
const connectMongo = require('connect-mongo');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const serveFavicon = require('serve-favicon');
const basicAuthenticationSerializer = require('./middleware/basic-authentication-serializer.js');
const bindUserToViewLocals = require('./middleware/bind-user-to-view-locals.js');
const passportConfigure = require('./passport-configuration.js');
const scheduler = require('./scheduler.js');
const indexRouter = require('./routes/index');
const authenticationRouter = require('./routes/authentication');
const accountRouter = require('./routes/accounts');
const analyticsRouter = require('./routes/analytics');
const cardRouter = require('./routes/card');
const transactionRouter = require('./routes/transaction');
// const exchangerateRouter = require('./routes/exchange-rates');

const app = express();

app.use(serveFavicon(join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 24 * 15,
      sameSite: 'lax',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    },
    store: new (connectMongo(expressSession))({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60 * 100000
    })
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(basicAuthenticationSerializer);
app.use(bindUserToViewLocals);

app.use('/api', indexRouter);
app.use('/api/authentication', authenticationRouter);
app.use('/api/accounts', accountRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/cards', cardRouter);
app.use('/api/transaction', transactionRouter);
// app.use('/api/exchange-rates', exchangerateRouter);

app.get('*', (req, res, next) => {
  res.sendFile(join(__dirname, './../client/build/index.html'));
});

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ type: 'error', error: { message: error.message } });
});

module.exports = app;
