/*
* Application routes
*/

"use strict";

import { core } from "./controllers/core-controller.js";
import { auth } from "./controllers/auth-controller.js";


let routes = (app) => {
  // Authentication routes
  app.route("/signup").get(auth.signupUser);
  app.route("/signup").post(auth.processSignUp);
  // app.route("/signin").get(auth.signinUser);
  // app.route("/signin").post(auth.processSigningInUser);
  // app.route("/signout").get(auth.signoutUser);

  // Core routes
  // app.route("/api/v1/users/:user")
  //   .get(user.findUser)
  //   .put(user.updateUser)
  //   .delete(user.deleteUser);

  // Core routes
  app.route("/").get(core.index);
  app.use(core.error404);
  app.use(core.error505);
};

export { routes };
