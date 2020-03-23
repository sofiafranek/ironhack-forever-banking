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
    },
    read: {
        type: Boolean,
        required: true
    }
});

schema.statics.createNotification = async function(userIDFrom, userIDTo, messageFrom, messageTo) {
    const Model = this;
    const read = false;
    const notification = await Model.create({
        userIDFrom,
        userIDTo,
        messageFrom,
        messageTo,
        read
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

schema.statics.hasUnreadNotifications = async function(userID) {
    const Model = this;
    const read = false;
    const listNotifications = await Model.find({
        $or: [ { userIDTo: userID } , { userIDFrom: userID }], read
    }).exec();

    return listNotifications;
};

schema.statics.updateNotification = async function(_id) {
    const Model = this;
    const read = true;
    const notification = await Model.findByIdAndUpdate(_id, read).exec();

    return notification;
};


module.exports = mongoose.model('Notification', schema);
