const bcrypt = require('bcrypt');
const User = require('../models/user');

const { validationResult } = require('express-validator');

exports.getSignUp = (req, res, next) => {
  let errMsg = req.flash('error');
  if (errMsg.length > 0) {
    errMsg = errMsg[0];
  } else {
    errMsg = null;
  }
  res.render('auth/signup', {
    pageTitle: 'Sign Up',
    path: '/signup',
    errorMessage: errMsg,
    oldInput: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationErrors: []
  })
}

exports.postSignUp = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const errors = validationResult(req);
  const quizzes = [];
  const quizzesTaken = [];
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/signup', {
      pageTitle: "Sign Up",
      path: '/signup',
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        username: username,
        password: password,
        confirmPassword: confirmPassword,
        quizzes: quizzes,
        quizzesTaken: quizzesTaken
      },
      validationErrors: errors.array()
    })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
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
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
}


exports.getLogin = async (req, res, next) => {
  let errMsg = req.flash('error');
  if (errMsg.length > 0) {
    errMsg = errMsg[0];
  } else {
    errMsg = null;
  }
  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login',
    errorMessage: errMsg,
    oldInput: {
      email: '',
      password: '',
    },
    validationErrors: [],

  })
}

exports.postLogin = async (req, res, next) => {
  const errors = validationResult(req);
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email: email });

  try {

    if (!errors.isEmpty()) {
      return res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        errorMessage: errors.array()[0].msg,
        oldInput: {
          email: email,
        },
        validationErrors: errors.array(),
      })
    }

    if (!user) {
      res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        errorMessage: 'Invalid email or password',
        oldInput: {
          email: email,
        },
        validationErrors: [],

      })
    }


    const match = await bcrypt.compare(password, user.password);

    if (match) {
      req.session.isLoggedIn = true;
      req.session.user = user;
      return req.session.save(err => {
        console.log(err);
        res.redirect('/');
      })
    }
    if (!match) {
      return res.status(422).render('auth/login', {
        pageTitle: 'Login',
        errorMessage: "Invalid email or password",
        oldInput: {
          email: email,
        },
        validationErrors: []
      })
    }
  }
  catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
}


exports.getLogout = (req, res, next) => {
  req.session.destroy(err => {
    res.redirect('/');
  })
}