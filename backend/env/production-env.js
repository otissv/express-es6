"use strict";

import { all } from "./all-env.js";


let production = {
  port   : all.port,
  baseURL: "http://www.yourwebsite.com",
  title  : all.title,
  db     : {
    uri  : "path/to/database/location",
    opts : all.db.opts
  },
  session: all.session
};

export { production };
