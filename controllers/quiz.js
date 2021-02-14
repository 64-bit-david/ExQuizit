const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport')
const dotenv = require('dotenv');

const Quiz = require('../models/quizModel');
const User = require('../models/user');

dotenv.config()

const QUIZ_CARDS_PER_PAGE = 10;
const USER_QUIZ_PER_PAGE = 5;

exports.getQuizzes = async (req, res, next) => {
  page = +req.query.page || 1;
  try {
    const numofQuizzes = await Quiz.find().countDocuments()
    totalQuizzes = numofQuizzes;
    const quizzes = await Quiz.find()
      .skip((page - 1) * QUIZ_CARDS_PER_PAGE)
      .limit(QUIZ_CARDS_PER_PAGE);

    return res.render('index', {
      pageTitle: 'Home',
      path: '/',
      quizzes: quizzes,
      totalQuizzes: totalQuizzes,
      currentPage: page,
      hasNextPage: QUIZ_CARDS_PER_PAGE * page < totalQuizzes,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalQuizzes / QUIZ_CARDS_PER_PAGE)
    })
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
}

exports.about = (req, res, next) => {
  res.render('about', {
    pageTitle: 'About Ex-Quiz-It',
    path: '/about',
  })
}

exports.getContact = (req, res, next) => {
  let errMsg = req.flash('error');
  if (errMsg.length > 0) {
    errMsg = errMsg[0];
  } else {
    errMsg = null;
  }
  res.render('contact', {
    pageTitle: "Contact",
    path: '/contact',
    errorMessage: errMsg,
    validationErrors: []
  })
}

exports.postContact = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('contact', {
      pageTitle: "Contact",
      path: '/contact',
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    })
  }
  const auth = {
    auth: {
      apiKey: `${process.env.MAILGUN_API_KEY}`,
      domain: 'sandbox399246faa3c14351988023444b52bf4a.mailgun.org',
    }
  };
  const transporter = nodemailer.createTransport(mailGun(auth));
  const mailOptions = {
    from: req.body.email,
    to: 'devtestingforme@gmail.com',
    subject: 'Ex-quiz-it contact',
    text: req.body.message
  }
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    }
    else {
      res.render('message-sent', {
        pageTitle: 'Message Sent',
        path: '/contact'
      })
    }
  })
}


exports.getQuiz = async (req, res, nex) => {
  const quizId = req.params.quizId;
  const quiz = await Quiz.findById(quizId).populate('createdBy');
  const createdBy = quiz.createdBy.username;
  const createdById = quiz.createdBy._id;
  let highestScore = null;
  let userId;

  try {
    const userLoggedIn = await User.findById(req.user);
    //get array of the quizIds of quizzes the user has taken
    if (userLoggedIn) {
      highestScore = "You haven't taken this quiz before";
      userId = req.user._id;
      const userQuizzesTakenArray = userLoggedIn.quizzesTaken.map((quiz) => {
        return quiz.quiz
      });

      //if user has taken current quiz before, get the quiz from their quizzestaken array
      //and extract the highest score taken
      if (userQuizzesTakenArray.includes(quizId)) {
        const quizArrayPos = userQuizzesTakenArray.findIndex(quiz => quiz === quizId)
        const currentQuizHistory = userLoggedIn.quizzesTaken[quizArrayPos];
        highestScore = `Your high score for this quiz is ${Math.max(...currentQuizHistory.score)}`;
      }
    }

    res.render('quiz-template', {
      path: '',
      quiz: quiz,
      userId: userId,
      pageTitle: quiz.title,
      createdBy: createdBy,
      createdById: createdById,
      highestScore: highestScore

    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};


exports.createQuizIndex = (req, res, next) => {
  let errMsg = req.flash('error');
  if (errMsg.length > 0) {
    errMsg = errMsg[0]
  } else {
    errMsg = null;
  }
  res.render('create-quiz/create-quiz-index', {
    pageTitle: 'Create Your Quiz',
    errorMessage: errMsg,
    validationErrors: [],
    path: '/create-quiz'
  });
};

exports.createQuizA = (req, res, next) => {
  let errMsg = req.flash('error');
  if (errMsg.length > 0) {
    errMsg = errMsg[0];
  } else {
    errMsg = null;
  }
  res.render('create-quiz/create-quiz-a', {
    pageTitle: 'Create Your Quiz',
    errorMessage: errMsg,
    validationErrors: [],
    path: '/create-quiz'

  })
}

exports.createQuizB = (req, res, next) => {
  let errMsg = req.flash('error');
  if (errMsg.length > 0) {
    errMsg = errMsg[0];
  } else {
    errMsg = null;
  }
  res.render('create-quiz/create-quiz-b', {
    pageTitle: 'Create Your Quiz',
    errorMessage: errMsg,
    validationErrors: [],
    path: '/create-quiz'
  })
}

exports.createQuizC = (req, res, next) => {
  res.render('create-quiz/create-quiz-c', {
    pageTitle: 'Create Your Quiz',
    path: '/create-quiz',
  })
}

exports.postCreateQuiz = async (req, res, next) => {
  const errors = validationResult(req);
  const title = req.body.title;
  const description = req.body.description;
  const time = req.body.time;
  const category = req.body.category;
  const qList = req.body.question;
  const aList = req.body.answer;
  const createdBy = req.user;
  const quizType = req.body.quizType;

  if (!errors.isEmpty() && quizType === 'typeB') {
    return res.render('create-quiz/create-quiz-b', {
      pageTitle: 'Create Quiz',
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
      path: '/create-quiz'

    })
  }

  if (!errors.isEmpty() && quizType === 'typeA') {
    return res.render('create-quiz/create-quiz-a', {
      pageTitle: 'Create Quiz',
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
      path: '/create-quiz'

    })
  }

  const quiz = new Quiz({
    title: title,
    description: description,
    time: time,
    category: category,
    qList: qList,
    aList: aList,
    createdBy: createdBy,
  });

  try {
    await quiz.save();
    createdBy.quizzes.push(quiz);
    createdBy.save();
    res.redirect('/');
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.deleteQuiz = async (req, res, next) => {
  const quizId = req.params.quizId;
  try {
    await Quiz.deleteOne({ _id: quizId });
    await User.updateOne({ _id: req.user }, { $pull: { "quizzes": quizId } });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

//Get's quiz list of user that made quiz
exports.getUser = async (req, res, next) => {
  const page = +req.query.page || 1;
  const userId = req.params.userId;
  if (userId.toString() === req.user._id.toString()) {
    return res.redirect('/user-quizzes');
  }

  try {
    const user = await User.findById(userId).populate('quizzes');
    const userQuizList = user.quizzes;
    const totalQuizzes = userQuizList.length;
    const numQuizzesToSkip = (page - 1) * QUIZ_CARDS_PER_PAGE;
    const quizzesToRender = userQuizList.slice(numQuizzesToSkip, numQuizzesToSkip + QUIZ_CARDS_PER_PAGE);

    res.render('user', {
      pageTitle: `${user.username}'s page`,
      path: '',
      user: user,
      quizzes: quizzesToRender,
      currentPage: page,
      hasNextPage: QUIZ_CARDS_PER_PAGE * page < totalQuizzes,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalQuizzes / QUIZ_CARDS_PER_PAGE)
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};


exports.getLoggedInUserQuizzes = async (req, res, next) => {
  const page = +req.query.page || 1;
  try {
    const user = await User.findById(req.user).populate('quizzes');
    const userQuizList = user.quizzes;
    const totalQuizzes = userQuizList.length;
    const numQuizzesToSkip = (page - 1) * USER_QUIZ_PER_PAGE;
    const quizzesToRender = userQuizList.slice(numQuizzesToSkip, numQuizzesToSkip + USER_QUIZ_PER_PAGE);

    res.render('user-quiz-list', {
      pageTitle: `${user.username}'s page`,
      path: '',
      quizzes: quizzesToRender,
      currentPage: page,
      hasNextPage: USER_QUIZ_PER_PAGE * page < totalQuizzes,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalQuizzes / USER_QUIZ_PER_PAGE)
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};


//passed to render method for caterogies
const catPaginationHelper = (quizzes, page, QUIZ_CARDS_PER_PAGE, totalQuizzes) => {
  return {
    quizzes: quizzes,
    totalQuizzes: totalQuizzes,
    currentPage: page,
    hasNextPage: QUIZ_CARDS_PER_PAGE * page < totalQuizzes,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    previousPage: page - 1,
    lastPage: Math.ceil(totalQuizzes / QUIZ_CARDS_PER_PAGE)
  }
}



exports.getGeneralKnowledgeQuizzes = async (req, res, next) => {
  const category = "general knowledge";
  const page = +req.query.page || 1;
  let totalQuizzes;

  try {
    const numofQuizzes = await Quiz.find({ category }).countDocuments();
    totalQuizzes = numofQuizzes;
    const quizzes = await Quiz.find({ category })
      .skip((page - 1) * QUIZ_CARDS_PER_PAGE)
      .limit(QUIZ_CARDS_PER_PAGE);

    const categoryRenderInfo = catPaginationHelper(quizzes, page, QUIZ_CARDS_PER_PAGE, totalQuizzes);

    res.render('categories', {
      pageTitle: "General Knowledge Quizzes",
      ...categoryRenderInfo,
      category: category,
      path: '',

    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.getHistoryQuizzes = async (req, res, next) => {
  const category = "history";
  const page = +req.query.page || 1;
  let totalQuizzes;
  try {
    const numofQuizzes = await Quiz.find({ category }).countDocuments();
    totalQuizzes = numofQuizzes;
    const quizzes = await Quiz.find({ category })
      .skip((page - 1) * QUIZ_CARDS_PER_PAGE)
      .limit(QUIZ_CARDS_PER_PAGE);

    const categoryRenderInfo = catPaginationHelper(quizzes, page, QUIZ_CARDS_PER_PAGE, totalQuizzes);

    res.render('categories', {
      pageTitle: "History",
      ...categoryRenderInfo,
      category: category,
      path: '',
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};


exports.getGeographyQuizzes = async (req, res, next) => {
  const category = "geography";
  const page = +req.query.page || 1;
  let totalQuizzes;
  try {
    const numofQuizzes = await Quiz.find({ category }).countDocuments();
    totalQuizzes = numofQuizzes;
    const quizzes = await Quiz.find({ category })
      .skip((page - 1) * QUIZ_CARDS_PER_PAGE)
      .limit(QUIZ_CARDS_PER_PAGE);

    const categoryRenderInfo = catPaginationHelper(quizzes, page, QUIZ_CARDS_PER_PAGE, totalQuizzes);


    res.render('categories', {
      pageTitle: "Geography Quizzes",
      ...categoryRenderInfo,
      category: category,
      path: '',
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.getMediaQuizzes = async (req, res, next) => {
  const category = "media";

  const page = +req.query.page || 1;
  let totalQuizzes;
  try {
    const numofQuizzes = await Quiz.find({ category }).countDocuments();
    totalQuizzes = numofQuizzes;
    const quizzes = await Quiz.find({ category })
      .skip((page - 1) * QUIZ_CARDS_PER_PAGE)
      .limit(QUIZ_CARDS_PER_PAGE);

    const categoryRenderInfo = catPaginationHelper(quizzes, page, QUIZ_CARDS_PER_PAGE, totalQuizzes);

    res.render('categories', {
      pageTitle: "Media Quizzes",
      ...categoryRenderInfo,
      category: category,
      path: '',
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.getSportQuizzes = async (req, res, next) => {
  const category = "sport";
  const page = +req.query.page || 1;
  let totalQuizzes;
  try {
    const numofQuizzes = await Quiz.find({ category }).countDocuments();
    totalQuizzes = numofQuizzes;
    const quizzes = await Quiz.find({ category })
      .skip((page - 1) * QUIZ_CARDS_PER_PAGE)
      .limit(QUIZ_CARDS_PER_PAGE);

    const categoryRenderInfo = catPaginationHelper(quizzes, page, QUIZ_CARDS_PER_PAGE, totalQuizzes);

    res.render('categories', {
      pageTitle: "Sport Quizzes",
      ...categoryRenderInfo,
      category: category,
      path: '',
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.getAllQuizzes = async (req, res, next) => {
  const page = +req.query.page || 1;
  const category = 'All Quizzes';
  let totalQuizzes;
  try {
    const numofQuizzes = await Quiz.find().countDocuments();
    totalQuizzes = numofQuizzes;
    const quizzes = await Quiz.find()
      .skip((page - 1) * QUIZ_CARDS_PER_PAGE)
      .limit(QUIZ_CARDS_PER_PAGE);

    const categoryRenderInfo = catPaginationHelper(quizzes, page, QUIZ_CARDS_PER_PAGE, totalQuizzes);

    res.render('categories', {
      pageTitle: "All Quizzes",
      ...categoryRenderInfo,
      category: category,
      path: '',
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};


exports.postUserQuizScore = async (req, res, next) => {
  const quiz = req.body.quizId;
  const latestScore = req.body.score;
  const quizObj = { quiz, score: latestScore };
  const user = await User.findById(req.user._id);
  const quizzesTakenQuizIds = user.quizzesTaken.map((quiz) => {
    return quiz.quiz;
  })
  const quizTakenBefore = quizzesTakenQuizIds.includes(quiz);
  if (!quizTakenBefore) {
    await User.updateOne({ _id: user }, { $push: { "quizzesTaken": quizObj } });
  }
  else {
    const quizPos = quizzesTakenQuizIds.findIndex(quizzesTakenQuizId => quizzesTakenQuizId === quiz);
    user.quizzesTaken[quizPos].score.push(latestScore);
    await user.save();
  }
  res.end();
}

