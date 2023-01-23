'use strict'
const express = require('express');
const createErrors = require('http-errors');
const app = express();

const indexRoutes = require('./routes/index');


app.use('/', indexRoutes);

app.use( (req, res, next) => {
  if (req !== 'GET') {
    next(createErrors(405));
  } else {
    next(createErrors(404))
  }
});

app.use( (err,req, res, next) => {
  res.status( err.status || 500);
  res.send( err.message)
})



module.exports = app;