/*
* Database connection
*/

"use strict";

import mongoose from "mongoose";


let database = {
  connection: (db) => {
    // Create the database connection
    mongoose.connect(db.uri, db.opts);

    // Event handlers
    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to " + db.uri);
    });
    mongoose.connection.on("error", (err) => {
      console.log("Mongoose connection error: " + err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose disconnected");
    });

    process.on("SIGINT", () => {
      mongoose.connection.close(() => {
        console.log("Mongoose disconnected through app termination");
      });
    });
  },

  instance: () => {
    return mongoose;
  }
};

export default database;
