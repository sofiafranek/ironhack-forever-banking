'use strict';

const { Router } = require('express');
const Card = require('./../database/models/card');
const UserAccount = require('./../database/models/userAccount');
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
  } catch (error) {
    next(error);
  }
});

// Returning only the cards that belong to the user logged in
router.get('/:id/user-cards', RouteGuard, async (req, res, next) => {
  const id = req.params.id;

  try {
    const card = await Card.getUserCards(id);
    console.log(card);
    res.json({ card });
  } catch (error) {
    next(error);
  }
});

// When user is logged in they create a card
router.post('/create-card', RouteGuard, async (req, res, next) => {
  const { accountID, cardNumber, CVV, expiryDate, type, userID } = req.body;

  console.log(req.body, 'REQ BODY');

  try {
    const card = await Card.createCard(accountID, cardNumber, CVV, type, expiryDate, userID);
    console.log('addd', card);
    res.json({ card });
  } catch (error) {
    console.log(error, 'ERROR');
    next(error);
  }
});

// Deletes specific account using the ID
router.post('/:id/delete-card', RouteGuard, async (req, res, next) => {
  const cardNumber = req.params.id;
  try {
    await Card.removeCard(cardNumber);
    res.json({ result: 'sucess' });
  } catch (error) {
    res.json({ result: 'error' });
    next(error);
  }
});

module.exports = router;
