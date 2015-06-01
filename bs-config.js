'use strict';

module.exports = {
  files: ['public/**/*', 'src/**/*'],
  exclude: false,
  // server: {
  //   baseDir: 'public',
  //   // directory: true,
  //   index: 'index.html'
  // },
  port: 9000,
  proxy: 'http://localhost:3000',
  startPath: null,
  ghostMode: {
    clicks: true,
    links: true,
    forms: true,
    scroll: true
  },
  open: false,
  noOpen: false,
  noNotify: false,
  xip: true,
  timestamps: true,
  fileTimeout: 1000,
  injectChanges: true,
  scrollProportionally: true,
  scrollThrottle: 0,
  notify: false,
  host: null,
  excludedFileTypes: [],
  reloadDelay: 0
};
