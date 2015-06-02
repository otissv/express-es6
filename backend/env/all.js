"use strict";

var secret = {session :"to be imported"};


let all = {
  title      : "Express-es6",
  description: "Express server with MongoDB",
  keywords   : "MongoDB, Express, Node.js",
  port       : process.env.PORT || 3000,
  session    : secret.session,
  db: {
    uri: "mongodb://127.0.0.1:27017/test",
    opts: {
      server: {
        socketOptions: { keepAlive: 1}
      }
    }
  }
};


export default all;
