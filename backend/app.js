'use strict';


import express from 'express';
let app = express();


/*
* Envioment configuration
*/
require('../backend/env/env.js')(app);


/*
* Middleware
*/
require('../backend/middleware/database.js').connection({
  uri: app.locals.db.uri,
  opts: app.locals.db.opts
});
require('../backend/middleware/views.js')(app);
require('../backend/middleware/logger.js')(app);
require('../backend/middleware/body.js')(app);
require('../backend/middleware/staticFiles.js')(app, express);


app.get('/', (req, res) => {
  res.render('index');
});

export default app;
