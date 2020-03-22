'use strict';

const { Router } = require('express');

const Credit = require('./../database/models/credit');
// const UserAccount = require('./../database/models/userAccount');

const router = new Router();

const RouteGuard = require('./../middleware/route-guard');

// Returning a credit from the ID
router.get('/:id', RouteGuard, async (req, res, next) => {
  const id = req.params.id;
  try {
    const credit = await Credit.getCreditAccountById(id);
    res.json({ credit });
  } catch (error) {
    next(error);
  }
});

// Get all the credit accounts from the user logged in
router.get('/:userID/credit', RouteGuard, async (req, res, next) => {
  const userID = req.params.userID;
  try {
    const accounts = await Credit.getCreditAccounts(userID);
    res.json({ accounts });
  } catch (error) {
    next(error);
  }
});

// When user applys for credit we create the credit account
router.post('/apply-for-credit', RouteGuard, async (req, res, next) => {
  const {
    accountNumber,
    limit,
    option,
    type,
    userID,
    outstanding,
    otherCredit,
    finanacialSupport,
    children,
    maritalStatus,
    income,
    occupation,
    reason,
    currency
  } = req.body;
  const limitNumber = Number(limit).toFixed(2);
  const minimumAmount = limit * 0.1;
  const optionSplitted = option.split(" ")[0];
  const datePayment = new Date();
  const month = datePayment.getMonth();
  //datePayment.setMonth(month + 1);
  let optionDB = '';
  (optionSplitted === 'Minimum') ? optionDB = 'minimum' : optionDB = 'total';

  try {
    const account = await Credit.createCreditAccount(
      accountNumber,
      type,
      limitNumber,
      limitNumber,
      minimumAmount,
      userID,
      outstanding,
      otherCredit,
      finanacialSupport,
      children,
      maritalStatus,
      income,
      occupation,
      reason,
      optionDB,
      datePayment,
      currency
    );
    res.json({ account });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Deletes specific account using the ID
router.post('/:id/delete-account', RouteGuard, async (req, res, next) => {
  const idAccount = req.params.id;
  try {
    await Credit.removeCreditAccount(idAccount);
    res.json({ result: 'sucess' });
  } catch (error) {
    next(error);
    res.json({ result: 'error' });
  }
});

module.exports = router;
