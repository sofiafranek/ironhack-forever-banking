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
        type: String
    },
    read: {
        type: Boolean
    }
});

module.exports = mongoose.model('Notification', schema);
