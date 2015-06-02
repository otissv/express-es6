"use strict";

import { all } from "./all-env.js";


let development = {
  port   : all.port,
  baseURL: "http://localhost:" + all.port,
  title  : all.title + " Dev",
  db     : all.db,
  session: all.session
};


export { development };
