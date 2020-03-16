'use strict';

const { Router } = require('express');
const Card = require('../models/card');
const router = new Router();
const RouteGuard = require('./../middleware/route-guard');

// Returning all of the cards
router.get('/', RouteGuard, (req, res, next) => {
  Card.find()
    .then(card => {
      res.json({ card });
    })
    .catch(error => {
      next(error);
    });
});

// Returning a card from the ID
router.get('/:id', RouteGuard, (req, res, next) => {
  const id = req.params.id;

  Card.findById(id)
    .then(card => {
      res.json({ card });
    })
    .catch(error => {
      next(error);
    });
});

// Returning only the cards that belong to the user logged in
router.get('/:id/user-cards', RouteGuard, (req, res, next) => {
  const id = req.params.id;

  Card.find({ userID: id })
    .populate('accountID')
    .then(card => {
      res.json({ card });
    })
    .catch(error => {
      next(error);
    });
});

// When user is logged in they create a card
router.post('/create-card', RouteGuard, (req, res, next) => {
  const { accountID, cardNumber, pin, CVV, expiryDate, type, userID } = req.body;

  Card.create({
    accountID,
    cardNumber,
    pin,
    CVV,
    type,
    expiryDate,
    userID
  })
    .then(card => {
      res.json({ card });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
