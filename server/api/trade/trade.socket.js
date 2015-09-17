/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Trade = require('./trade.model');

exports.register = function(socket) {
  Trade.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Trade.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('trade:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('trade:remove', doc);
}