'use strict';

import app from '../../../backend/app.js';
import helpers from '../../helpers/helpers.js';
import request from 'supertest'
describe('Core routes', () => {
  after( () => {
    helpers.uncacheModule('../../backend/app.js');
  });

  it('Should GET / - User can get home route', done => {
    request(app)
      .get('/')
      .expect(200, done);
  });

  it('Should not GET /invalid - User cannot get non-existent route', done => {
    request(app)
      .get('/invalid')
      .expect(400, done);
  });

});
