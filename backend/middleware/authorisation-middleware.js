/*
* Application Authorisation
*/

'use strict';

import User from '../models/users-model.js';
var LocalStrategy = require('passport-local').Strategy;


let authorisation = (app, passport) => {

  /*
  * Initalise passport
  */
  app.use(passport.initialize());
  app.use(passport.session());

  app.use( (req, res, next) => {
    res.locals.login = req.user;
    next();
  });


  /*
  * Passport session
  */
  passport.serializeUser( (user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser( (id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });


  /*
  * Local Strategy
  */
  passport.use('local-signup', new LocalStrategy(
    (username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (user) {
          return done(null, false, { message: 'Username already taken'});
        } else {
          return done(null, true);
        }
      });
    }
  ));


  passport.use('local-signin', new LocalStrategy(
    (username, password, done) => {

      if (typeof username === 'undefined' || typeof password === 'undefined') {
        return done(null, false);
      }

      User.findOne({username: username }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false, { message: 'Incorrect username' });
        }

        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user);
      });
    }
  ));
};


export default authorisation ;
