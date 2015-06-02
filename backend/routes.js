/*
* Application routes
*/

"use strict";

let routes = (app) => {
  app.get("/", (req, res) => {
    res.render("index");
  });
};

export { routes };
