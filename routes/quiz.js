const express = require('express');
const router = express.Router();
const { check, body } = require('express-validator');

const quizController = require('../controllers/quiz');
const isAuth = require('../middleware/isAuth')


router.get('/', quizController.getQuizzes);

router.get('/quizzes/:quizId', quizController.getQuiz);

router.get('/about', quizController.about);

router.get('/user/:userId', quizController.getUser);

router.get('/user-quizzes', isAuth, quizController.getLoggedInUserQuizzes);

router.delete('/delete-quiz/:quizId', isAuth, quizController.deleteQuiz);


//Quiz Categories

router.get('/categories/general-knowledge', quizController.getGeneralKnowledgeQuizzes);

router.get('/categories/history', quizController.getHistoryQuizzes);

router.get('/categories/geography', quizController.getGeographyQuizzes);

router.get('/categories/media', quizController.getMediaQuizzes);

router.get('/categories/sport', quizController.getSportQuizzes);

router.get('/categories/all-quizzes', quizController.getAllQuizzes);


router.post('/user-quiz-score', quizController.postUserQuizScore);


//Creating Quizzes

router.get('/create-quiz/create-quiz-index', isAuth, quizController.createQuizIndex);

router.get('/create-quiz/create-quiz-a', isAuth, quizController.createQuizA);

router.get('/create-quiz/create-quiz-b', isAuth, quizController.createQuizB);

router.get('/create-quiz/create-quiz-c', isAuth, quizController.createQuizC);


router.post('/create-quiz', isAuth, quizController.postCreateQuiz);




module.exports = router;