'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  accountID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  cardNumber: {
    type: Number,
    required: true
  },
  pin: {
    type: Number,
    required: true
  },
  CVV: {
    type: Number,
    required: true
  },
  expiryDate: {
    type: String,
    required: true
  },

  type: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Card', schema);
