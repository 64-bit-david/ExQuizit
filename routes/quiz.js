const express = require('express');

const router = express.Router();

const quizController = require('../controllers/quiz');

const isAuth = require('../middleware/isAuth')


router.get('/', quizController.getQuizzes);

router.get('/quizzes/:quizId', quizController.getQuiz);

router.get('/about', quizController.about);

router.get('/create-quiz/create-quiz-index', isAuth, quizController.createQuizIndex);

router.get('/create-quiz/create-quiz-a', isAuth, quizController.createQuizA);

router.get('/create-quiz/create-quiz-b', isAuth, quizController.createQuizB);

router.get('/create-quiz/create-quiz-c', isAuth, quizController.createQuizC);

router.post('/create-quiz', isAuth, quizController.postCreateQuiz);

router.get('/user-quizzes', isAuth, quizController.getUserQuizzes);




module.exports = router;