'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  accountNumber: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['Savings', 'Current', 'Credit']
  },
  balance: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

schema.statics('updateBalance', async function(id, balance) {
  const Model = this;
  await Model.findByIdAndUpdate(id, { balance });
});

module.exports = mongoose.model('Account', schema);
