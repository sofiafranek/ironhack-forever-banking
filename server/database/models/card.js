'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  accountID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  cardNumber: {
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

schema.statics.getCards = async function() {
  const Model = this;
  const cards = await Model.find();
  return cards;
};

schema.statics.getCardById = async function(id) {
  const Model = this;
  const card = await Model.findById(id);
  return card;
};

schema.statics.createCard = async function(accountID, cardNumber, CVV, type, expiryDate, userID) {
  const Model = this;
  const card = await Model.create({
    accountID,
    cardNumber,
    CVV,
    type,
    expiryDate,
    userID
  });

  return card;
};

schema.statics.getUserCards = async function(userID) {
  const Model = this;
  const card = await Model.find({
    userID
  })
    .populate('accountID');

  return card;
};

schema.statics.getUserCard = async function(userID) {
  const Model = this;
  const card = await Model.findOne({
    userID
  });

  return card;
};

schema.statics.removeCard = async function(cardNumber) {
  const Model = this;
  const removedCard = await Model.findOneAndRemove({
    cardNumber
  });

  return removedCard;
};

module.exports = mongoose.model('Card', schema);
