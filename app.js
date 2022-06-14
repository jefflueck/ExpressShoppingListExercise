const express = require('express');
const storeRoutes = require('./storeRoutes');
const ExpressError = require('./expressError');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use('/items', storeRoutes);

app.use(function (req, res, next) {
  return new ExpressError('Not Found', 404);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: err.message,
  });
});

module.exports = app;
