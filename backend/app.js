"use strict";

import express from "express";
import database from "../backend/database/database.js";
import passport from "passport";
import { env } from "../backend/env/env.js";
import { views } from "../backend/middleware/views-middleware.js";
import { logger } from "../backend/middleware/logger-middleware.js";
import { body } from "../backend/middleware/body-middleware.js";
import { staticFiles } from"../backend/middleware/staticFiles-middleware.js";
import { session } from "../backend/middleware/session-middleware.js";
import { passportInitialize, passportSession } from "../backend/middleware/authorisation-middleware.js";
// import { security } from "../backend/middleware/security-middleware.js";
import { routes } from "./routes.js";

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
// security(app);
routes(app);

export default app;
