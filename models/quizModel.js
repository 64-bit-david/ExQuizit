const mongoose = require('mongoose');
const User = require('./user');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true
  },
  qList: {
    type: Array,
  },
  aList: {
    type: Array,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }


});

module.exports = mongoose.model('Quiz', quizSchema);