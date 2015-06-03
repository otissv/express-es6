/*
* Authorisation strategies
*/

'use strict';

var LocalStrategy = require('passport-local').Strategy;

import User from '../models/users.model.js';


let strategies = (passport) => {

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
          var newUser = new User();

          // newUser.firstName = firstName;
          // newUser.lastName  = lastName;
          newUser.username = username;
          // newUser.displayName = firstName + ' ' + lastName;
          // newUser.email = email;
          newUser.password = newUser.generateHash(password);
          newUser.provider = 'local';
          newUser.rolesn = 'user';
          newUser.updated = Date.now();
          newUser.lastLogin = Date.now();

          newUser.save( (error) => {
            if (error) {
              throw error;
            }
            return done(null, newUser);
          });
        }
      });
    }
  ));


  passport.use('local-signin', new LocalStrategy(
    (username, password, done) => {
      User.findOne({username: username }, (err, user) => {
        if (err) { return done(err); }
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

export default strategies;
