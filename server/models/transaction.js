'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  accountIDTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  accountIDFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  totalAmount: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  reference:{
    type: String
  },
  endPoint: {
    type: String
  },
  category: {
    type: String,
    enum: ['Housing', 'Transport', 'Food & Dining', 'Utility bills', 'Cell phone', 'Childcare and school costs', 'Pet food', 'Pet insurance', 'Clothing', 'Health insurance', 'Fitness', 'Auto insurance', 'Life insurance', 'Fun stuff', 'Travel', 'Student loans', 'Credit-card debt', 'Retirement', 'Emergency fund', 'Large purchases']
  }
});

module.exports = mongoose.model('Transaction', schema);
