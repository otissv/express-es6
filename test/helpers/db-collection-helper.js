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
  let documents = {};


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


    // Insert manual documents into data
    if (typeof docs !== 'undefined') {
      if (Array.isArray(docs)) {
        docs.forEach( (docItem) => {
          let tmp = typeof documents[docItem.name] === 'undefined' ? documents[docItem.name] = [] : documents[docItem.name];

          tmp.push(docItem.data);

        }, documents);

        Object.keys(documents).forEach( (key) => {
          insertDocuments(db, key, documents[key]);
        });
      } else {

        documents[docs.name] = docs.data;

        insertDocuments(db, docs.name, docs.data);
      }
    }
    db.close();
  });
};


export default dbCollection;
