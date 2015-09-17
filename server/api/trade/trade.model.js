'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TradeSchema = new Schema({
  bookId: String,
  ownerId: String,
  title: String,
  fromId: String,
  fromCity: String,
  isApproved: {
    type: Boolean,
    'default': false
  },
  active: Boolean
});

module.exports = mongoose.model('Trade', TradeSchema);