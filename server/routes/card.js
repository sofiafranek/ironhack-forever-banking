'use strict';

const { Router } = require('express');
const Card = require('../models/card');
const router = new Router();
const RouteGuard = require('./../middleware/route-guard');

// Returning all of the cards
router.get('/', RouteGuard, async (req, res, next) => {
  try {
    const card = await Card.getCards();
    res.json({ card });
  } catch (error) {
    next(error);
  }
});

// Returning a card from the ID
router.get('/:id', RouteGuard, async (req, res, next) => {
  const id = req.params.id;
  try {
    const card = await Card.getCardById(id);
    res.json({ card });
  }
  catch (error) {
    next(error);
  }

});

// Returning only the cards that belong to the user logged in
router.get('/:id/user-cards', RouteGuard, async (req, res, next) => {
  const id = req.params.id;

  try {
    const card = await Card.getUserCards(id);
    res.json({ card });
  } catch (error) {
    next(error);
  } 

});

// When user is logged in they create a card
router.post('/create-card', RouteGuard, async (req, res, next) => {
  const { accountID, cardNumber, pin, CVV, expiryDate, type, userID } = req.body;

  try {
    const card = await Card.createCard(
      accountID,
      cardNumber,
      pin,
      CVV,
      type,
      expiryDate,
      userID
    );
    res.json({ card });
  }
  catch (error) {
    next(error);
  }

});

module.exports = router;
