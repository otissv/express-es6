"use strict";

import express from "express";
import database from "../backend/database/database.js";
import passport from "passport";
import { env } from "../backend/env/env.js";
import { views } from "../backend/middleware/views.js";
import { logger } from "../backend/middleware/logger.js";
import { body } from "../backend/middleware/body.js";
import { staticFiles } from"../backend/middleware/staticFiles.js";
import { session } from "../backend/middleware/session.js";
import { passportInitialize, passportSession } from "../backend/middleware/authorisation.js";

let app = express();

env(app);
database.connection({ uri: app.locals.db.uri, opts: app.locals.db.opts });
views(app);
logger(app);
body(app);
staticFiles(app, express);
session(app, database.instance());
passportInitialize(app, passport);
passportSession(passport);

// require("../backend/middleware/security.js")(app);


app.get("/", (req, res) => {
  res.render("index");
});

export default app;
