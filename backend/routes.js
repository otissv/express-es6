/*
* Application routes
*/

"use strict";

import { core } from "./controllers/core-controller.js";


let routes = (app) => {
  // Core routes
  app.route("/").get(core.index);
  app.use(core.error404);
  app.use(core.error505);
};

export { routes };
