/*
* Appplication secruity
*/

"use strict";

import csrf from "csurf";
import helmet from "helmet";


let security = (app) => {

  app.disable("x-powered-by");
  app.use(csrf());

  app.use( (req, res, next) => {
    let token = req.csrfToken();

    res.cookie("XSRF-TOKEN", token);
    next();
  });

  // Content Security Policy
  if (app.get("env" !== "development")) {
    app.use(helmet.csp({
      defaultSrc: ["'self'"],
      scriptSrc: ["*.google-analytics.com"],
      styleSrc: ["'unsafe-inline'"],
      imgSrc: ["*.google-analytics.com"],
      connectSrc: ["'none'"],
      fontSrc: [],
      objectSrc: [],
      mediaSrc: [],
      frameSrc: []
    }));
  }


  app.use(helmet.xssFilter());
  app.use(helmet.xframe());
  app.use(helmet.hsts({
    maxAge: 7776000000,
    includeSubdomains: true
  }));
  app.use(helmet.noSniff());
  app.use(helmet.ieNoOpen());
  // app.use(require("express-enforces-ssl"));
};

export { security };
