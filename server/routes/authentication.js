'use strict';

const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const User = require('./../models/user');

const router = new Router();

/* const RouteGuard = require("./../middleware/route-guard"); */

router.get('/userinformation', (req, res, next) => {
  console.log('USERERR', req.user);
  res.json({ user: req.user || null });
});

router.post('/signup', (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    nationality,
    occupation,
    ID,
    address
  } = req.body;

  bcryptjs
    .hash(password, 10)
    .then(hash => {
      return User.create({
        name: firstName + ' ' + lastName,
        email,
        passwordHash: hash,
        phoneNumber,
        nationality,
        occupation,
        //DOB: date,
        ID,
        address
      });
    })
    .then(user => {
      console.log('USER', user);
      req.session.user = user._id;
      res.json({ user });
    })
    .catch(error => {
      console.log(error);
      next(error);
    });
});

router.post('/signin', (req, res, next) => {
  let user;
  const { phoneNumber, password } = req.body;
  console.log(phoneNumber);

  User.findOne({ phoneNumber })
    .then(document => {
      if (!document) {
        return Promise.reject(new Error("There's no user with that email."));
      } else {
        user = document;
        return bcryptjs.compare(password, user.passwordHash);
      }
    })
    .then(result => {
      if (result) {
        req.session.user = user._id;
        res.json({ user });
      } else {
        return Promise.reject(new Error('Wrong password.'));
      }
    })
    .catch(error => {
      next(error);
    });
});

router.post('/signout', (req, res, next) => {
  console.log('BACK SIGNOUT');
  req.session.destroy();
  res.json({});
});

module.exports = router;
