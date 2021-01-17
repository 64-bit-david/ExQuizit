const mongoose = require('mongoose');
const Quiz = require('./quizModel');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    //min? 6
  },
  email: {
    type: String,
    required: true,
    //max? 255
    //min? 6
  },
  password: {
    type: String,
    required: true,
    //max? 1024
    //min? 6
  },
  quizzes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Quiz,
      required: true,
    }
  ],
  quizzesTaken: [
    {
      quiz: String,
      score: Number,
    }
  ]
})

module.exports = mongoose.model('User', userSchema);