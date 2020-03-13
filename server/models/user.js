'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  phoneNumber: {
    type: String,
    //required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  DOB: {
    type: Date
    //required: true
  },
  nactionality: {
    type: String
    //required: true
  },
  ID: {
    type: String
    //required: true
  },
  address: {
    type: String
    //required: true
  },
  occupation: {
    type: String
    //required: true
  },
  passwordHash: {
    type: String
  }
});

module.exports = mongoose.model('User', schema);
