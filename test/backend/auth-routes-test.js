'use strict';

import app from '../../backend/app.js';
import request from 'supertest';
import helpers from '../helpers/helpers.js';


describe('Authorisation routes', () => {

  before( () => {
    helpers.dbCollection({
      url   : 'mongodb://127.0.0.1:27017/test',
      drop  : ['users'],
      seed  : ['users'],
      insert:[{
        name: 'users',
        data: {
          username: 'ania',
          password: 'xyz'
        }
      }]
    });
  });


  after( () => {
    helpers.uncacheModule('../../backend/app.js');
  });


  describe('Signup routes', () => {
    it('Sould GET /signup - User can get sign up page', done => {
      request(app)
        .get('/signup')
        .expect(200, done);
    });


    it('Souuld POST /signup - User cannot sign up with missing credentials', done => {
      request(app)
        .post('/signup')
        .expect(401, done);
    });


    it('Souuld POST /signup - User can sign up', done => {
      let signupDetails = {
        username: 'otis',
        password: 'xyz'
      };

      request(app)
        .post('/signup')
        .send(signupDetails)
        .expect(302, done);
    });


    it('Souuld POST /signup - User already exists', done => {
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
    it('Souuld GET  /signin - User can get sign in page', done => {
      request(app)
        .get('/signin')
        .expect(200, done);
    });

    it('Souuld POST /signin - User cannot sign in with missing credentials', done => {
      request(app)
        .post('/signin')
        .expect(401, done);
    });

    it('Souuld POST /signin - User cannot sign in with incorrect credentials', done => {
      let signupDetails = {
        username: 'otis',
        password: 'incorrect'
      };

      request(app)
        .post('/signin')
        .send(signupDetails)
        .expect(401, done);
    });

    it('Souuld POST /signin - User can sign in', done => {
      let signupDetails = {
        username: 'otis',
        password: 'xyz'
      };

      request(app)
        .post('/signin')
        .send(signupDetails)
        .expect(302, done);
    });
  });

  describe('Signout route', () => {
    it('Souuld POST /signout - User can sign out & redirected to /', done => {
      request(app)
        .get('/signout')
        .expect(302, done);
    });
  });
});
