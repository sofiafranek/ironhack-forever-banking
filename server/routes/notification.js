'use strict';

const { Router } = require('express');
const router = new Router();
const RouteGuard = require('../middleware/route-guard');
const Notification = require('./../database/models/notification');

router.post('/create-notification', RouteGuard, async (req, res, next) => {
    const {
        userIDFrom,
        userIDTo,
        message
    } = req.body;

    try {
        const notification = await Notification.createNotification(userIDFrom, userIDTo, message);
        res.json({ notification });
    } catch (error) {
        next(error);
    }
});

router.get('/:userID/list', RouteGuard, async (req, res, next) => {
    const { userID } = this.params;

    try {
        const notifications = await Notification.listNotifications(userID);
        res.json({ notifications });
      } catch (error) {
        next(error);
      }
});

module.exports = router;
