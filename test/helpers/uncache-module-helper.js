/*
 * Runs over the cache to search for all the cached files
 */

'use strict';


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

  require.searchCache(moduleName, (mod) => {
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

export default uncache;
