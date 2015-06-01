'use strict';

/*
* Configuration
*/
import express from 'express';
let app = express();


require('../backend/config/env.js')(app);


/*
* Middleware
*/
require('../backend/middleware/views.js')(app);
require('../backend/middleware/logger.js')(app);
// require('../backend/middleware/body.js')(app);
// require('../backend/middleware/staticFiles.js')(app, express);


app.get('/', function (req, res) {
  res.render('index');
});

export default app;
