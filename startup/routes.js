const express = require('express');
const genres = require('../routes/genres');

const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const dashboard = require('../routes/views/dashboard');
const returns = require('../routes/returns');
const error = require('../middleware/error');
const user = require("../routes/views/user");
const device = require("../routes/device");
const index = require("../routes/index");

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/genres', genres);
  app.use('/api/customers', customers);
  app.use('/api/movies', movies);
  app.use('/api/rentals', rentals);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use("/api/devices", device);
  app.use('/api/returns', returns);
  app.use("/dashboard",dashboard);
  app.use("/user",user);
  app.use("/",index);
  app.use(error);
}