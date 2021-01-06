const express = require('express');
const { check, body } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/auth');
const User = require('../models/user')

router.get('/signup', authController.getSignUp);
router.post('/signup',
  [
    check('email', 'Please enter valid email')
      .isEmail()
      .normalizeEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value })
          .then(user => {
            if (user) {
              return Promise.reject('Email already in use. Please select another');
            }
          })
      }),
    check('username', 'Please enter username')
      .isLength({ min: 1 })
      .custom(value => {
        return User.findOne({ username: value })
          .then(user => {
            if (user) {
              return Promise.reject('Username taken. Please select another')
            }
          })

      }),
    body('password', "Password must be at least 6 letters long")
      .isLength({ min: 6 })
      .trim()
    ,
    body('confirmPassword')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords have to match!');
        }
        return true;
      })

  ],
  authController.postSignUp);

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.get('/logout', authController.getLogout);



module.exports = router;
