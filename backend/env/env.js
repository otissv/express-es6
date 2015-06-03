'use strict';

import development from './development-env.js';
import production from './production-env.js';


var env = (app) => {
  var config;

  switch (app.get('env')) {
    case 'development':
      config = development;
      break;
    case 'production':
      config = production;
      break;
    default:
      throw new Error('Unknow exection Enviorment:');
  }


  /*
  *Application variables
  */
  app.set('baseURL', config.baseURL);
  app.locals.port = config.port;
  app.locals.title = config.title;
  app.locals.description = config.description;
  app.locals.db = config.db;
  app.locals.session = config.session;
};


export default env;
