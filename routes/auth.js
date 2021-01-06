const express = require('express');

const { check, body } = require('express-validator');

const router = express.Router();

const authController = require('../controllers/auth');


router.get('/signup', authController.getSignUp);
router.post('/signup',
  [
    check('email', 'Please enter valid email')
      .isEmail()
      .normalizeEmail(),
    body('password', "Password must be at least 6 letters long")
      .isLength({ min: 6 })
      .trim()
  ],
  authController.postSignUp);

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.get('/logout', authController.getLogout);



module.exports = router;
