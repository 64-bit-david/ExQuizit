const bcrypt = require('bcrypt');
const User = require('../models/user');

const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');



exports.getSignUp = (req, res, next) => {
  let errMsg = req.flash('error');
  if (errMsg.length > 0) {
    errMsg = errMsg[0];
  } else {
    errMsg = null;
  }
  res.render('auth/signup', {
    pageTitle: 'Sign Up',
    errorMessage: errMsg,
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
      req.flash('error', 'Email already in use');
      res.redirect('/signup');
    }

    const usernameExists = await User.findOne({ username: username });

    if (usernameExists) {
      req.flash('error', 'Username already taken');
      res.redirect('/signup');
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
  let errMsg = req.flash('error');
  if (errMsg.length > 0) {
    errMsg = errMsg[0];
  } else {
    errMsg = null;
  };
  res.render('auth/login', {
    pageTitle: 'Login',
    errorMessage: errMsg,
  })
}

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email: email });

  if (!user) {
    req.flash('error', 'Invalid email or password');
    return res.redirect('/login');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    req.flash('error', 'Invalid email or password');
    return res.redirect('/login');
  }

  if (match) {
    req.session.isLoggedIn = true;
    req.session.user = user;
    return req.session.save(err => {
      console.log(err);
      res.redirect('/');

    })
  }
  else {
    res.redirect('auth/signup');
    console.log('did not work');
  }
}

exports.getLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err, 'hello');
    res.redirect('/');
  })
}