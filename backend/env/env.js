'use strict';


var env = function(app) {
  var config;
  switch (app.get('env')) {
    case 'development':
      config = require('./development.js');
      break;
    case 'production':
      config = require('./production.js');
      break;
    default:
      throw new Error('Unknow exection Enviorment:');
  }

  //View variables
  app.set('baseURL', config.baseURL);
  app.locals.port = config.port;
  app.locals.title = config.title;
  app.locals.description = config.description;
  app.locals.db = config.db;
  app.locals.session = config.session;
};


export default env;
