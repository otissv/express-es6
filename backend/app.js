'use strict';

import express from 'express';
import database from '../backend/database/db.js';
import passport from 'passport';


let app = express();


/*
* Envioment configuration
*/
import { env } from '../backend/env/env.js';
env(app);


/*
* Middleware
*/

database.connection({
  uri: app.locals.db.uri,
  opts: app.locals.db.opts
});

require('../backend/middleware/views.js')(app);
require('../backend/middleware/logger.js')(app);
require('../backend/middleware/body.js')(app);
require('../backend/middleware/staticFiles.js')(app, express);

require('../backend/middleware/session.js')(app, database.instance());

import { passportInitialize, passportSession } from '../backend/middleware/authorisation.js';
passportInitialize(app, passport);
passportSession(passport);

// require('../backend/middleware/security.js')(app);


app.get('/', (req, res) => {
  res.render('index');
});

export default app;
