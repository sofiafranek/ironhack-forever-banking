'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  accountID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  endPoint: {
    type: String
  },
  totalAmount: {
    type: Number
  },
  type: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Payment', schema);
