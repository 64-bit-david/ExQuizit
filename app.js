const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const dotenv = require('dotenv');


const errorController = require('./controllers/error');
const User = require('./models/user');


dotenv.config();


const router = express.Router();

const quizRoutes = require('./routes/quiz');
const authRoutes = require('./routes/auth');



const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
});


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'img')));

app.use(
  session({
    secret: process.env.TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
  })
);




app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();

})

app.use(quizRoutes);
app.use(authRoutes);
app.use(errorController.get404);

mongoose.connect(MONGODB_URI,
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