'use strict';

const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const User = require('./../database/models/user');

const router = new Router();

// Returning all the users information
router.get('/userinformation', (req, res, next) => {
  res.json({ user: req.user || null });
});

// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

router.post('/signup', (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    nationality,
    dob,
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
        dob,
        ID,
        address
      });
    })
    .then(user => {
      req.session.user = user._id;
      client.messages
        .create({
          from: 'whatsapp:+351916275555',
          body: 'TRAABAALHA CARALHOOO',
          to: 'whatsapp:+351919057319'
        })
        .then(message => console.log(message.sid));
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

  User.findOne({ phoneNumber })
    .then(document => {
      if (!document) {
        res.json({ error: "There's no account with that phone number" });
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
        res.json({ error: 'Wrong password' });
        return Promise.reject(new Error('Wrong password.'));
      }
    })
    .catch(error => {
      next(error);
    });
});

router.post('/signout', (req, res, next) => {
  req.session.destroy();
  res.json({});
});

module.exports = router;
