/*
*Application session
*/

'use strict';


import expressSession from 'express-session';
import cookieParser from 'cookie-parser';
import flash from 'req-flash';

let MongoStore = require('connect-mongo')(expressSession);

let session = (app, mongoose) => {
  app.use(cookieParser());

  app.use(expressSession({
    secret: app.locals.session,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    saveUninitialized: true,
    resave: true
  }));

  app.use(flash({ locals: 'flash' }));
};

export default session ;
