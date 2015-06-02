"use strict";

import app from "../../backend/app.js"

var request = require ("supertest");

describe("Core routes", () => {

  it("Gets /", done => {
    request(app)
      .get("/")
      .expect(200, done)
  });

});
