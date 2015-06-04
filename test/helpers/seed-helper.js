/*
* Seed data
*/

'use strict';

import schema from '../seed/schema-seed.js';


/*
* Seed Data
*/
let seed = {
  schema: {},

  create (collection) {
    let documents = [];
    let Schema = schema[collection][0];
    let count = schema[collection][1];

    for (var i = 0; i < count; i++) {
      documents.push( new Schema());
    }
    
    return documents;
  }
};


export default seed;
