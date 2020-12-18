const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');



const router = express.Router();

const quizRoutes = require('./routes/quiz');

const mongoURI = "mongodb+srv://user_1:xL7VesNMlolvfC2e@cluster0.7n92y.mongodb.net/ex-quiz-it";

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'img')));

app.use(quizRoutes);

mongoose.connect(mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
)
  .then(result => {
    app.listen(3000);
  }).catch(err => {
    console.log(err);
  });