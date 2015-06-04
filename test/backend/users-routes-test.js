/*
* Users routes tests
*/

'use strict';

import app from '../../backend/app.js';
import request from 'supertest';
import helpers from '../helpers/helpers.js';


describe('User routes', () => {
  const url = 'mongodb://127.0.0.1:27017/test';

  let data;

  let testUser = {
    username: 'ania',
    password: 'xyz'
  };

  before( () => {
    data = helpers.db.insertOne({
      url        : url,
      collection : 'users',
      data       :testUser
    });
  });


  after( () => {
    helpers.uncacheModule('../../backend/app.js');
  });


  it('GET /users/:user - Can get a vaild user', done => {

    request(app)
      .get(`/users/${data.id}`)
      .expect(200, done);
  });

  it('GET /users/:user - User is not found', done => {

    request(app)
      .get(`/users/invalid`)
      .expect(404, done);
  });


  it('PUT /users/:user - Can update user details', done => {
    const id = data.id.toString();

    data.document.email = 'otis@xcom.com';

    request(app)
      .put(`/users/${id}`)
      .send(data)
      .expect(200, done);
  });

  it('PUT /users/:user - Can cannot update a non-existent user', done => {
    data.id = 'invalid';

    request(app)
      .put(`/users/invalid`)
      .send(data)
      .expect(400, done);
  });

  it('GET /users/:user');
});
