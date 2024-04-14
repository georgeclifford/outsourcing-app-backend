const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  cardName: {
    type: String,
    required: true
  },
  permissions: {
    businessRequestor: Boolean,
    businessController: Boolean,
    reviewer: Boolean,
    approver: Boolean
  }
});

module.exports = mongoose.model('Card', cardSchema);
