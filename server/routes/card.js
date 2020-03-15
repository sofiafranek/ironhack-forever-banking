'use strict';

const { Router } = require('express');
const Card = require('../models/card');
const router = new Router();
const RouteGuard = require('./../middleware/route-guard');

router.get('/', RouteGuard, (req, res, next) => {
  Card.find()
    .then(card => {
      res.json({ card });
    })
    .catch(error => {
      next(error);
    });
});

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

router.post('/create-card', RouteGuard, (req, res, next) => {
  const { accountID, cardNumber, pin, CVV, expiryDate, type } = req.body;

  Card.create({
    accountID,
    cardNumber,
    pin,
    CVV,
    type,
    expiryDate
  })
    .then(card => {
      console.log(card);
      res.json({ card });
    })
    .catch(error => {
      console.log(error);
      next(error);
    });
});

module.exports = router;
