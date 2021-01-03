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

exports.createQuizIndex = (req, res, next) => {
  res.render('create-quiz/create-quiz-index', {
    pageTitle: 'Create Your Quiz',
  })
}

exports.createQuizA = (req, res, next) => {
  res.render('create-quiz/create-quiz-a', {
    pageTitle: 'Create Your Quiz',
  })
}

exports.createQuizB = (req, res, next) => {
  res.render('create-quiz/create-quiz-b', {
    pageTitle: 'Create Your Quiz',
  })
}

exports.createQuizC = (req, res, next) => {
  res.render('create-quiz/create-quiz-c', {
    pageTitle: 'Create Your Quiz',
  })
}
exports.postCreateQuiz = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const time = req.body.time;
  const category = req.body.category;
  const qList = req.body.question;
  const aList = req.body.answer;


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
      res.redirect('/');
    });
}

