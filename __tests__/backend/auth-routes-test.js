'use strict';

import app from '../../backend/app.js';
import request from 'supertest';
import helpers from '../test-helpers.js';


describe('Authorisation routes', () => {

  before( () => {
    helpers.collections({
      url   : 'mongodb://127.0.0.1:27017/test',
      drop  : ['users'],
      seed  : [ ['users', 3] ]
    });
  });


  after( () => {
    helpers.uncache('../../backend/app.js');
  });


  describe('Signup routes', () => {

    it('GET /signup - User can get sign up page', done => {
      request(app)
        .get('/')
        .expect(200, done);
    });


    it('POST /signup - User cannot sign up with missing credentials', done => {
      request(app)
        .post('/signup')
        .expect(401, done);
    });


    it('POST /signup - User can sign up', done => {
      let signupDetails = {
        username: 'otis',
        password: 'xyz'
      };

      request(app)
        .post('/signup')
        .send(signupDetails)
        .expect(302, done);
    });


    it('POST /signup - User already exists', done => {
      let signupDetails = {
        username: 'otis',
        password: 'xyz'
      };

      request(app)
        .post('/signup')
        .send(signupDetails)
        .expect(401, done);
    });
  });


  describe('Signin routes', () => {

    it('GET  /signin - User can get sign in page');
    it('POST /signin - User cannot sign in with missing credentials');
    it('POST /signin - User cannot sign in with incorrect credentials');
    it('POST /signin - User can sign in');
  });


  describe('Signout route', () => {

    it('POST /signout - User can sign out & redirected to /');
  });
});
