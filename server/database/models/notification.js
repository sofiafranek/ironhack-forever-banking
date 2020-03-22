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
    messageFrom: {
        type: String,
        required: true
    },
    messageTo: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

schema.statics.createNotification = async function(userIDFrom, userIDTo, messageFrom, messageTo) {
    const Model = this;

    const notification = await Model.create({
        userIDFrom,
        userIDTo,
        messageFrom,
        messageTo
    });
    
    return notification;
  };

schema.statics.listNotifications = async function(userID) {
    const Model = this;

    const listNotifications = await Model.find({
        $or: [ { userIDTo: userID } , { userIDFrom: userID }]
    }).sort({'createdAt': -1}).exec();

    return listNotifications;
};


module.exports = mongoose.model('Notification', schema);
