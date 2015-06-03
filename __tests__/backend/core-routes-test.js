'use strict';

import app from '../../backend/app.js';
import request from 'supertest';
import helpers from '../test-helpers.js';

describe('Core routes', () => {
  after( () => {
    helpers.uncache('../../backend/app.js');
  });

  it('Can get /', done => {
    request(app)
      .get('/')
      .expect(200, done);
  });

});
