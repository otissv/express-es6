'use strict';

/*
* Configuration
*/
var express = require('express');
var app = express();
var env = require('../backend/config/env.js')(app);


app.get('/', function (req, res) {
  res.send('Hello World!');
});

export default app;
