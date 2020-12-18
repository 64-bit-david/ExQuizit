const Quiz = require('../models/quizModel');


exports.getQuizzes = (req, res, next) => {
  Quiz.find()
    .then(quizzes => {

      res.render('index', {
        pageTitle: 'Home',
        path: '/',
        quizzes: quizzes,
      })
    })
}

exports.about = (req, res, next) => {
  res.render('about', {
    pageTitle: 'About Ex-Quiz-It',
    path: '/about',
  })
}

exports.getQuiz = (req, res, nex) => {
  const quizId = req.params.quizId;
  Quiz.findById(quizId)
    .then(quiz => {
      res.render('quiz-template', {
        quiz: quiz,
        pageTitle: quiz.title,
      })
    })

}

exports.createQuiz = (req, res, next) => {
  res.render('create-quiz', {
    pageTitle: 'Create Your Quiz',
    path: 'create-quiz',
  })
}

exports.postCreateQuiz = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const time = req.body.time;
  const category = req.body.category;
  const qList = req.body.answer;
  const aList = req.body.question;

  const quiz = new Quiz({
    title: title,
    description: description,
    time: time,
    category: category,
    qList: qList,
    aList: aList,
  });

  quiz.save()
    .then(result => {
      console.log('Quiz Created!');
      res.redirect('/');
    });
}

