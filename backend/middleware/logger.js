/*
* Application logger
*/

'use strict';

let logger = function(app) {
  switch (app.get('env')) {
  case 'development':
    app.use(require('morgan')('dev'));
    break;
  case 'production':
    app.use(require('experss-logger')({
      path: __dirname + '/log/requests.log'
    }));
    break;
  }
};

export default logger;
