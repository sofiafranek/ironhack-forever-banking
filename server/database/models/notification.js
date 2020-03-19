'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userIDFrom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userIDTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: String,
        required: true
    }
});

schema.statics.createNotification = async function(userIDFrom, userIDTo, message) {
    const Model = this;

    const notification = await Model.create({
        userIDFrom,
        userIDTo,
        message
    });
    
    return notification;
  };

schema.statics.listNotifications = async function(userIDTo) {
    const Model = this;

    const listNotifications = await Model.find({
        userIDTo
    });

    return listNotifications;
};

module.exports = mongoose.model('Notification', schema);
