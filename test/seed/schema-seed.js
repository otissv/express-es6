/*
* Seed models
*/

'use strict';

import faker from 'faker';


class Users {
  constructor () {
    this.username = faker.internet.userName();
    this.password = faker.internet.password();
  }
}


let schema = {
  users: [Users, 3]
};

export default schema;
