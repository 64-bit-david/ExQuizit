const Quiz = require('../models/quizModel');
const User = require('../models/user');


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

exports.getQuiz = async (req, res, nex) => {
  const quizId = req.params.quizId;
  const quiz = await Quiz.findById(quizId);
  const userId = quiz.createdBy;
  const user = await User.findById(userId);

  res.render('quiz-template', {
    quiz: quiz,
    pageTitle: quiz.title,
    username: user.username,
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
exports.postCreateQuiz = async (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const time = req.body.time;
  const category = req.body.category;
  const qList = req.body.question;
  const aList = req.body.answer;
  const createdBy = req.user;

  const quiz = new Quiz({
    title: title,
    description: description,
    time: time,
    category: category,
    qList: qList,
    aList: aList,
    createdBy: createdBy,
  });

  await quiz.save();
  createdBy.quizzes.push(quiz);
  createdBy.save();
  res.redirect('/');
};

exports.getUser = async (req, res, next) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  console.log(user.username);
  res.render('user', {
    pageTitle: 'hello',
    user: user,
  })

}

exports.getUserQuizzes = async (req, res, next) => {
  const userQuizzes = await User.findById(req.user).populate('quizzes');
  const userQuizList = userQuizzes.quizzes;
  res.render('user-quiz-list', {
    pageTitle: 'Your Quizzes',
    quizzes: userQuizList
  });
};

exports.getGeneralKnowledgeQuizzes = async (req, res, next) => {
  const quizList = await Quiz.find({ category: 'general knowledge' });
  res.render('categories', {
    pageTitle: "General Knowledge Quizzes",
    quizzes: quizList,
  });
};

exports.getHistoryQuizzes = async (req, res, next) => {
  const quizList = await Quiz.find({ category: 'history' });
  res.render('categories', {
    pageTitle: "History",
    quizzes: quizList,
  });
};


exports.getGeographyQuizzes = async (req, res, next) => {
  const quizList = await Quiz.find({ category: 'geography' });
  res.render('categories', {
    pageTitle: "Geography Quizzes",
    quizzes: quizList,
  });
};

exports.getMediaQuizzes = async (req, res, next) => {
  const quizList = await Quiz.find({ category: 'media' });
  res.render('categories', {
    pageTitle: "Media Quizzes",
    quizzes: quizList,
  });
};

exports.getSportQuizzes = async (req, res, next) => {
  const quizList = await Quiz.find({ category: 'sport' });
  res.render('categories', {
    pageTitle: "Sport Quizzes",
    quizzes: quizList,
  });
};

exports.getAllQuizzes = async (req, res, next) => {
  const quizList = await Quiz.find();
  res.render('categories', {
    pageTitle: "All Quizzes",
    quizzes: quizList,
  });
};
