// backend/user/user.controller.js

// User contoller

'use strict';
import passport from 'passport';

// Sends sign up page

let auth = {
  signupUser (req, res) {
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
      }

      req.logIn(user, (error) => {
        if (error) { return next(err); }
        return res.redirect('/');
      });
    })(req, res, next);
  }
};

export default auth ;
