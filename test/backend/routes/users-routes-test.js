/*
* Users routes tests
*/

'use strict';

import app from '../../../backend/app.js';
import helpers from '../../helpers/helpers.js';
import request from 'supertest';

describe('User routes', () => {
  const url = 'mongodb://127.0.0.1:27017/test';
  const collection = 'users';

  let user;
  let id;

  let data = {
    username: 'ania',
    password: 'xyz'
  };


  before( () => {
    user = helpers.db.insertOne( {url, collection, data} );
  });


  after( () => {
    helpers.uncacheModule('../../backend/app.js');
  });


  it('Should not GET /users/:user - User is not found', done => {
    request(app)
      .get(`/users/invalid`)
      .expect(400, done);
  });

  it('Should GET /users/:user - Can get a vaild user', done => {
    id = user._id.toString();

    request(app)
      .get(`/users/${id}`)
      .expect(200, done);
  });

  it('Should not PUT /users/:user - Cannot update a non-existent user', done => {
    data.id = 'invalid';

    request(app)
      .put(`/users/invalid`)
      .send(data)
      .expect(404, done);
  });

  it('Should not PUT /users/:user - Cannot update a non-existent user', done => {
    data.id = 'invalid';

    request(app)
      .put(`/users/invalid`)
      .send(data)
      .expect(404, done);
  });

  it('Should PUT /users/:user - Can update user details', done => {
    id = user._id.toString();
    data.email = 'otis@xcom.com';

    request(app)
      .put(`/users/${id}`)
      .send(data)
      .expect(200, done);
  });


  it('Should not Delete /users/:user - Cannot delete non-existent user', done => {
    id = 'invalid';

    request(app)
      .delete(`/users/${id}`)
      .expect(404, done);
  });

  it('Should Delete /users/:user - Can delete user', done => {
    id = user._id.toString();

    request(app)
      .delete(`/users/${id}`)
      .expect(200, done);
  });


});
