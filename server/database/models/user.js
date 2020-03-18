'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  dob: {
    type: String,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  ID: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
    required: true
  },
  income: {
    type: Number,
    required: true
  },
  passwordHash: {
    type: String
  }
});

schema.statics.getUserByPhoneNumber = async function(phoneNumber) {
  const Model = this;
  const user = await Model.findOne({ phoneNumber }).exec();

  return user;
};
module.exports = mongoose.model('User', schema);
