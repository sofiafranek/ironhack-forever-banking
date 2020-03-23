'use strict';

const { Router } = require('express');
const router = new Router();
const RouteGuard = require('../middleware/route-guard');
const Notification = require('./../database/models/notification');

router.post('/create-notification', RouteGuard, async (req, res, next) => {
    const {
        userIDFrom,
        userIDTo,
        messageFrom,
        messageTo
    } = req.body;

    try {
        const notification = await Notification.createNotification(userIDFrom, userIDTo, messageFrom, messageTo);
        res.json({ notification });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get('/:userID/list', RouteGuard, async (req, res, next) => {

    const { userID } = req.params;

    try {
        const notifications = await Notification.listNotifications(userID);
        res.json({ notifications });
      } catch (error) {
        next(error);
      }
});

router.post('/:id', RouteGuard, async (req, res, next) => {

    const { id } = req.params;

    try {
        const notification = await Notification.updateNotification(id);
        console.log(notification);
        res.json({ notification });
      } catch (error) {
        next(error);
      }
});

router.get('/:userID/unreadNotifications', RouteGuard, async (req, res, next) => {

    const { userID } = req.params;

    try {
        let result = false;
        const notifications = await Notification.hasUnreadNotifications(userID);
        if (notifications.length > 0) result = true;
        console.log("Notifications", notifications);
        res.json( { result } );
      } catch (error) {
        next(error);
      }
});

module.exports = router;
