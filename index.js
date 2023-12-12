const winston = require("winston");
const express = require("express");
const config = require("config");
const app = express();
const ejs = require('ejs');
const path = require("path");

app.use(express.static('public'))
app.set('view engine' , 'ejs');
console.log("Welcome to my express application!");
// app.set('views', path.join(__dirname, './views'))

// require("./startup/logging")();
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
