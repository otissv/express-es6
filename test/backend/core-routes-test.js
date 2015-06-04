'use strict';

import app from '../../backend/app.js';
import request from 'supertest';
import helpers from '../helpers/helpers.js';

describe('Core routes', () => {
  after( () => {
    helpers.uncacheModule('../../backend/app.js');
  });

  it('Should GET / - User can get home page', done => {
    request(app)
      .get('/')
      .expect(200, done);
  });

});
