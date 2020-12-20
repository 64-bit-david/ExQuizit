const express = require('express');

const router = express.Router();

const quizController = require('../controllers/quiz');


router.get('/', quizController.getQuizzes);

router.get('/quizzes/:quizId', quizController.getQuiz);

router.get('/about', quizController.about);

router.get('/create-quiz', quizController.createQuiz);

router.post('/create-quiz', quizController.postCreateQuiz);




module.exports = router;