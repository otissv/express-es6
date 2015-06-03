/*
* Seed data
*/

'use strict';

import faker from 'faker';


let seedData = {
  users: {
    username: faker.internet.userName(),
    password: faker.internet.password()
  }
};


export default seedData;
