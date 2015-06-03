#!/usr/bin/env node

'use strict';

import app from './app.js';

// =============================================================================
// Application Sever
// =============================================================================

app.set('port', process.env.PORT || app.locals.port);

var server = app.listen(app.get('port'), () => {
  console.log('Express server started in ' + app.get('env') + ' mode on http://localhost:' + server.address().port);
});
