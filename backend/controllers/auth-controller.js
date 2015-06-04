// backend/user/user.controller.js

// User contoller

'use strict';
import passport from 'passport';
import User from '../models/users.model.js';



let auth = {
  signUp (req, res) {
    return res.render('signup', { title: 'Sign up' });
  },

  processSignUp (req, res, next) {
    passport.authenticate('local-signup', (err, user, info) => {
      if (err) { return next(err); }

      if (!user) {
        if (info.message === 'Missing credentials') {
          info.message = 'Not all fields completed';
        }
        res.status(401);

        return res.render('signup', {
          type   : 'danger',
          message: info.message
        });
      } else {
        let newUser = new User();

        Object.keys(req.body).forEach( (key) => {
          newUser[key] = key === 'password' ? newUser.generateHash(req.body.password) : req.body[key];
        });

        newUser.updated = Date.now();
        newUser.lastLogin = Date.now();

        newUser.save( (error) => {
          if (error) {
            throw error;
          }
          return res.redirect('/');
        });
      }
    })(req, res, next);
  },

  signIn (req, res) {
    return res.render('signin', { title: 'Sign in' });
  },

  processSignIn (req, res, next) {
    passport.authenticate('local-signin', (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        if (info.message === 'Missing credentials') {
          info.message = 'Password or username incorrect';
        }
        res.status(401);

        return res.render('signin', {
          type   : 'danger',
          message: info.message
        });
      }

      req.logIn(user, (error) => {

        if (error) {
          return next(error);
        }
        return res.redirect('/');
      });
    })(req, res, next);
  },

  signOut (req, res) {
    req.logout();
    res.redirect('/');
  },

  isAuthenticated (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect(302, '/signin');
  }
};

export default auth ;
