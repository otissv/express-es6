/*
* Core Controller
*/

'use strict';


let core = {
  index (req, res ) {
    res.render('index');
  },

  error404 (req, res) {
    res.status(400);
    res.render('404.html', {title: '404: File Not Found'});
  },

  error505 (error, req, res, next) {
    res.status(500);
    res.render('500.html', {title:'500: Internal Server Error', error: error});
    next();
  }
};

export default core;
