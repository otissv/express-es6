/*
* User controller
*/

'use strict';

import User from '../models/users-model.js';

let userController = {
  find (req, res) {
    User.findById(req.params.user, (err, user) => {
      if (typeof user !== 'undefined') {
        return res.send(user);
      } else {
        res.status(404);
        return res.send({
          message: err
        });
      }
    });
  },


  update (req, res) {
    const data = req.body.document;
    const id = { _id: req.body.id };

    User.update(id, data, (err, user) => {
      if (err) {
        return res.status(400).send({
          message: 'User cannot be found'
        });
      } else {
        return res.json(user);
      }
    });
  },


  remove (req, res) {
    var user = req.user;

    user.remove( (err) => {
      if (err) {
        return res.status(400).send({
          message: helper.getErrorMessage(err, "user")
        });
      } else {
        return res.json(user);
      }
    });
  }

};

export default userController;
