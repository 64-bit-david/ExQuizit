const bcrypt = require('bcrypt');
const User = require('../models/user');

const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');



exports.getSignUp = (req, res, next) => {
  res.render('auth/signup', {
    pageTitle: 'Sign Up',
  })
}

exports.postSignUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    throw error;
  }
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirmedPass = req.body.confPassword;



  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const userEmailExists = await User.findOne({ email: email });

    if (userEmailExists) {
      const error = new Error('User with this email already exists');
      error.statusCode = 401;
      console.log('user with email exists');
      res.redirect('/');
    }

    const usernameExists = await User.findOne({ username: username });

    if (usernameExists) {
      const error = new Error('username already exists');
      error.statusCode = 401;
      console.log('username already exists');
      res.redirect('/');
    }

    const user = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    await user.save();

    res.redirect('/');
  } catch (err) {
    console.log(err, 'hi');
  }
}


exports.getLogin = async (req, res, next) => {
  res.render('auth/login', {
    pageTitle: 'Login',
  })
}

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email: email });

  const match = await bcrypt.compare(password, user.password);
  if (match) {
    req.session.isLoggedIn = true;
    req.session.user = user;
    // req.session.save(err);
    res.redirect('/');
  }
  else {
    res.redirect('auth/signup');
    console.log('did not work');
  }
}

exports.getLogout = async (req, res, next) => {
  req.session.destroy(err => {
    console.log(err, 'hello');
    res.redirect('/');
  })
}