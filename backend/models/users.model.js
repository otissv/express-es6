/*
*
 User model
*/
'use strict';

import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';


let userSchema = new mongoose.Schema({
  firstName: String,

  lastName: String,

  displayName: String,

  username: {
    type: String,
    unique: true,
    required: 'Please fill in username',
    trim: true
  },

  email: {
    type: String,
    // unique:true,
    // required: 'Please fill in your email'
    // match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },

  password: {
    type: String,
    required: 'Please fill in password'
  },

  provider: {
    type: String,
    default: 'local'
  },

  providerData: {},

  additionalProvidersData: {},

  roles: {
    type: [{
      type: String,
      enum: ['user', 'admin']
    }],
    default: ['user']
  },

  lastLogin: {
    type: Date
  },
  created: {
    type: Date
  },

  updated: {
    type: Date,
    default: Date.now
  }
});


/*
/* Methods
*/
userSchema.methods.generateHash = function generateHash (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function validPassword (password) {
  return bcrypt.compareSync(password, this.password);
};


export default mongoose.model('User', userSchema);
