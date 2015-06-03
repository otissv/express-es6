/*
* Test helper methods
*/

'use strict';

import seedData from './seed/seed.js';
import fs from 'fs';

/*
 * Runs over the cache to search for all the cached
 * files
 */
require.searchCache = (moduleName, callback) => {
  // Resolve the module identified by the specified name
  let mod = require.resolve(moduleName);

  // Check if the module has been resolved and found within
  // the cache
  if (mod && ((mod = require.cache[mod]) !== undefined)) {
    // Recursively go over the results
    (function run (modN) {
      // Go over each of the module's children and
      // run over it
      modN.children.forEach( (child) => {
        run(child);
      });

      // Call the specified callback providing the
      // found module
      callback(modN);
    })(mod);
  }
};


let uncache = (moduleName) => {
  // Run over the cache looking for the files
  // loaded by the specified module name
  let modName = moduleName.substr(3);

  require.searchCache(modName, (mod) => {
    delete require.cache[mod.id];
  });

  // Remove cached paths to the module.
  // Thanks to @bentael for pointing this out.
  Object.keys(module.constructor._pathCache).forEach( (cacheKey) => {
    if (cacheKey.indexOf(moduleName)>0) {
      delete module.constructor._pathCache[cacheKey];
    }
  });
};


/*
* Factory to create fake documents from seed data
*/
let seed = (collectionName, count) => {
  let documents = [];
  let docCount = typeof count !== 'undefined' ? count : 1;

  for (var i = 0; i < docCount; i++) {
    documents[i] = seedData[collectionName];
  }

  return documents;
};


/*
* Reset Database collections
*/
let collections = (opts) => {
  let url = opts.url;
  let dropCols = opts.drop;
  let insertDocs = opts.seed;
  let jsonData = [];

  let MongoClient = require('mongodb').MongoClient;

  MongoClient.connect(url, (err, db) => {
    if (err) { console.log(err); }

    if (typeof dropCols !== 'undefined') {
      dropCols.forEach( (collection) => {
        db.collection(collection).drop();
      });
    }

    if (typeof insertDocs !== 'undefined') {
      insertDocs.forEach( (collection) => {
        let collectionName = collection[0];
        let count = collection[1];
        let documents = seed(collectionName, count);

        jsonData.push(documents);
        db.collection(collectionName).insert(documents);
      });

      fs.writeFile(`${__dirname}/seed/seed.json`, JSON.stringify(jsonData), (error) => {
        if (error) { console.log(error); }
      });

    }

    db.close();
  });
};



/*
* Public helper methods
*/
let helpers = {
  uncache,
  collections,
  seed
};

export default helpers;
