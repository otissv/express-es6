/*
* Drop database collections helpers
*/

'use strict';

import seed from './seed-helper.js';


let dropCollection = (db, dropCols) => {
  dropCols.forEach( (collection) => {
    db.collection(collection).drop();
  });
};


/*
* Insert database collections
*/
let insertDocuments = (db, collection, data) => {
  db.collection(collection).insert(data);

  // fs.writeFile(`${__dirname}/seed/seed.json`, JSON.stringify(data), (error) => {
  //   if (error) { console.log(error); }
  // });
};


/*
* Reset Database collections
*/
let dbCollection = (opts) => {
  let MongoClient = require('mongodb').MongoClient;
  let url = opts.url;
  let dropCols = opts.drop;
  let insertSeed = opts.seed;
  let docs = opts.insert;
  let docData = [];

  // Add docs to to documents to be inserted
  MongoClient.connect(url, (err, db) => {
    if (err) { console.log(err); }

    // Drop collections
    if (typeof dropCols !== 'undefined') {
      dropCollection(db, dropCols);
    }


    // Insert seed documents into data
    if (typeof insertSeed !== 'undefined') {
      insertSeed.forEach( (item) => {
        insertDocuments(db, item, seed.create(item));
      });
    }


    // Insert param documents into data
    if (Array.isArray(docs)) {
      docs.forEach( (docItem) => {
        docData.push(docItem.data);
        insertDocuments(db, docItem.name, docData);
      });
    } else if (typeof docs !== 'undefined') {
      docData.push(docs.data);
      insertDocuments(db, docs.name, docData);
    }


    db.close();
  });
};


export default dbCollection;
