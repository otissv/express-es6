// backend/user/user.model.js

// User model

'use strict';

// =============================================================================
// Dependencies.
// =============================================================================
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


// =============================================================================
// User Schema.
// =============================================================================
var userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  displayName: {
    type: String
  },
  username: {
    type: String,
    unique: true,
    required: 'Please fill in a username',
    trim: true
  },
  email: {
    type: String,
    unique:true,
    // required: 'Please fill in your email'
    // match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    default: ''
  },
  provider: {
    type: String,
    required: 'Provider is required'
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
  created: {
    type: Date
  },
  updated: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  }
});


// =============================================================================
// Methods
// =============================================================================

// generating a hash
userSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = (password) => {
  return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', userSchema);
