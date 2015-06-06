/*
* User controller
*/

'use strict';

import User from '../models/users-model.js';

let userController = {
  find (req, res) {
    const id = req.params.user;

    User.findById(id, (err, user) => {
      if (err) {
        return res.status(400).send({
          message: 'User cannot be found'
        });
      }

      if (typeof user !== 'undefined' && user !== null) {
        return res.send(user);
      } else {
        return res.status(404).send({
          message: 'error'
        });
      }
    });
  },


  update (req, res) {
    const data = req.body;
    const id = req.body.id;

    User.update(id, data, (err, result) => {
      if (err) {
        return res.status(400).send({
          message: 'User cannot be found'
        });
      }

      if (result.nModified === 1) {
        return res.send({message: 'success'});
      } else {
        return res.status(404).send({
          message: 'error'
        });
      }
    });
  },


  remove (req, res) {
    var id = req.params.user;

    User.remove( id, (err, result) => {
      if (err) {
        return res.status(400).send({
          message: 'User cannot be found'
        });
      }

      if (result.result.n === 1) {
        return res.status(404).send({
          message: 'error'
        });
      } else {
        return res.send({message: 'success'});
      }

    });
  }

};

export default userController;
