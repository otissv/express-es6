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

  it('Can get /signup', done => {
    request(app)
      .get('/')
      .expect(200, done);
  });

  it('Unauthorized post to /signup', done => {
    request(app)
      .post('/signup')
      .expect(401, done);
  });

  it('can post to /signup', done => {
    let signupDetails = {
      username: 'otis',
      password: 'xyz'
    };

    request(app)
      .post('/signup')
      .send(signupDetails)
      .expect(302, done);
  });

  it('User already exists', done => {
    let signupDetails = {
      username: 'otis',
      password: 'xyz'
    };

    request(app)
      .post('/signup')
      .send(signupDetails)
      .expect(401, done);
  });

  it('User already exists');

});
