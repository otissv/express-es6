'use strict';

/*
* Sets view engine and views directory path
*/
var swig = require('swig');
var path = require('path');


let view = function(app) {
  app.engine('html', swig.renderFile);
  app.set('view engine', 'html');

  app.set('views', path.join(__dirname, '../../backend/views/'));
};

export default view;
