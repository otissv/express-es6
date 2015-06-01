/*
* Body parser
* Should be placed before express.static
*/

'use strict';


import bodyParser from 'body-parser';
import methodOverride from 'method-override';


let body = function(app) {
  app.use(bodyParser.json()); // Parse application/json
  app.use(bodyParser.urlencoded({ extended: false })); // Parse application/x-www-form-urlencoded
  app.use(methodOverride());// Over ride request header
};

export default body;
