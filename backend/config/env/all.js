'use strict';

var secret = {session :'to be imported'};

// =============================================================================
// Configuration
// =============================================================================
let all = {
  title: 'React Starter',
  description: 'Full-Stack JavaScript with MongoDB, Express, React, and Node.js',
  keywords: 'MongoDB, Express, React, and Node.js',
  port: process.env.PORT || 3000,
  session: secret.session,
  db: {
    uri: 'mongodb://127.0.0.1:27017/test',
    opts: {
      server: {
        socketOptions: { keepAlive: 1}
      }
    }
  }
};

export default all;
