/*
* Sets view engine and views directory path
*/

"use strict";


import swig from "swig";
import path from "path";


let views = (app) => {
  app.engine("html", swig.renderFile);
  app.set("view engine", "html");

  app.set("views", path.join(__dirname, "../../backend/views/"));
};

export { views };
