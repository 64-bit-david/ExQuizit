const Quiz = require('../models/quizModel');
const User = require('../models/user');

const { validationResult } = require('express-validator');


const QUIZ_CARDS_PER_PAGE = 10;
const USER_QUIZ_PER_PAGE = 5;

exports.getQuizzes = async (req, res, next) => {
  page = +req.query.page || 1;
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
}

exports.about = (req, res, next) => {
  res.render('about', {
    pageTitle: 'About Ex-Quiz-It',
    path: '/about',
  })
}

exports.contact = (req, res, next) => {
  res.render('contact', {
    pageTitle: "Contact",
    path: '/contact',
    errorMessage: null,

  })
}

exports.getQuiz = async (req, res, nex) => {
  const quizId = req.params.quizId;
  const quiz = await Quiz.findById(quizId).populate('createdBy');
  const createdBy = quiz.createdBy.username;
  const createdById = quiz.createdBy._id;
  let highestScore = "You haven't taken this quiz before"

  const userLoggedIn = await User.findById(req.user);
  //get array of the quizIds of quizzes the user has taken
  const userQuizzesTakenArray = userLoggedIn.quizzesTaken.map((quiz) => {
    return quiz.quiz
  });
  //if user has taken current quiz before, get the quiz from their quizzestaken array
  //and extract the highest score taken
  if (userQuizzesTakenArray.includes(quizId)) {
    const quizArrayPos = userQuizzesTakenArray.findIndex(quiz => quiz === quizId)
    const currentQuizHistory = userLoggedIn.quizzesTaken[quizArrayPos];
    highestScore = `Your highest score in this quiz so far is ${Math.max(...currentQuizHistory.score)}!`;
  }

  res.render('quiz-template', {
    quiz: quiz,
    pageTitle: quiz.title,
    createdBy: createdBy,
    createdById: createdById,
    highestScore: highestScore

  });
};


exports.createQuizIndex = (req, res, next) => {

  res.render('create-quiz/create-quiz-index', {
    pageTitle: 'Create Your Quiz',
  });
};

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

exports.deleteQuiz = async (req, res, next) => {
  const quizId = req.params.quizId;
  try {
    await Quiz.deleteOne({ _id: quizId });
    await User.updateOne({ _id: req.user }, { $pull: { "quizzes": quizId } });
  } catch (err) {
    console.log(err)
  }
};

//Get's quiz list of user that made quiz
exports.getUser = async (req, res, next) => {
  const page = +req.query.page || 1;
  const userId = req.params.userId;
  if (userId.toString() === req.user._id.toString()) {
    return res.redirect('/user-quizzes');
  }

  const user = await User.findById(userId).populate('quizzes');
  const userQuizList = user.quizzes;
  const totalQuizzes = userQuizList.length;
  const numQuizzesToSkip = (page - 1) * QUIZ_CARDS_PER_PAGE;
  const quizzesToRender = userQuizList.slice(numQuizzesToSkip, numQuizzesToSkip + QUIZ_CARDS_PER_PAGE);

  res.render('user', {
    pageTitle: 'hello',
    user: user,
    quizzes: quizzesToRender,
    currentPage: page,
    hasNextPage: QUIZ_CARDS_PER_PAGE * page < totalQuizzes,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    previousPage: page - 1,
    lastPage: Math.ceil(totalQuizzes / QUIZ_CARDS_PER_PAGE)
  });
};


exports.getLoggedInUserQuizzes = async (req, res, next) => {
  const page = +req.query.page || 1;
  const user = await User.findById(req.user).populate('quizzes');
  const userQuizList = user.quizzes;
  const totalQuizzes = userQuizList.length;
  const numQuizzesToSkip = (page - 1) * USER_QUIZ_PER_PAGE;
  const quizzesToRender = userQuizList.slice(numQuizzesToSkip, numQuizzesToSkip + USER_QUIZ_PER_PAGE);

  res.render('user-quiz-list', {
    pageTitle: 'Your Quizzes',
    quizzes: quizzesToRender,
    currentPage: page,
    hasNextPage: USER_QUIZ_PER_PAGE * page < totalQuizzes,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    previousPage: page - 1,
    lastPage: Math.ceil(totalQuizzes / USER_QUIZ_PER_PAGE)
  });
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
  const numofQuizzes = await Quiz.find({ category }).countDocuments();
  totalQuizzes = numofQuizzes;
  const quizzes = await Quiz.find({ category })
    .skip((page - 1) * QUIZ_CARDS_PER_PAGE)
    .limit(QUIZ_CARDS_PER_PAGE);

  const categoryRenderInfo = catPaginationHelper(quizzes, page, QUIZ_CARDS_PER_PAGE, totalQuizzes);

  res.render('categories', {
    pageTitle: "General Knowledge Quizzes",
    ...categoryRenderInfo,
  });
};

exports.getHistoryQuizzes = async (req, res, next) => {
  const category = "history";
  const page = +req.query.page || 1;
  let totalQuizzes;
  const numofQuizzes = await Quiz.find({ category }).countDocuments();
  totalQuizzes = numofQuizzes;
  const quizzes = await Quiz.find({ category })
    .skip((page - 1) * QUIZ_CARDS_PER_PAGE)
    .limit(QUIZ_CARDS_PER_PAGE);

  const categoryRenderInfo = catPaginationHelper(quizzes, page, QUIZ_CARDS_PER_PAGE, totalQuizzes);

  res.render('categories', {
    pageTitle: "History",
    ...categoryRenderInfo,
  });
};


exports.getGeographyQuizzes = async (req, res, next) => {
  const category = "geography";
  const page = +req.query.page || 1;
  let totalQuizzes;
  const numofQuizzes = await Quiz.find({ category }).countDocuments();
  totalQuizzes = numofQuizzes;
  const quizzes = await Quiz.find({ category })
    .skip((page - 1) * QUIZ_CARDS_PER_PAGE)
    .limit(QUIZ_CARDS_PER_PAGE);

  const categoryRenderInfo = catPaginationHelper(quizzes, page, QUIZ_CARDS_PER_PAGE, totalQuizzes);

  res.render('categories', {
    pageTitle: "Geography Quizzes",
    ...categoryRenderInfo,
  });
};

exports.getMediaQuizzes = async (req, res, next) => {
  const category = "media";

  const page = +req.query.page || 1;
  let totalQuizzes;
  const numofQuizzes = await Quiz.find({ category }).countDocuments();
  totalQuizzes = numofQuizzes;
  const quizzes = await Quiz.find({ category })
    .skip((page - 1) * QUIZ_CARDS_PER_PAGE)
    .limit(QUIZ_CARDS_PER_PAGE);

  const categoryRenderInfo = catPaginationHelper(quizzes, page, QUIZ_CARDS_PER_PAGE, totalQuizzes);

  res.render('categories', {
    pageTitle: "Media Quizzes",
    ...categoryRenderInfo,
  });
};

exports.getSportQuizzes = async (req, res, next) => {
  const category = "sport";
  const page = +req.query.page || 1;
  let totalQuizzes;
  const numofQuizzes = await Quiz.find({ category }).countDocuments();
  totalQuizzes = numofQuizzes;
  const quizzes = await Quiz.find({ category })
    .skip((page - 1) * QUIZ_CARDS_PER_PAGE)
    .limit(QUIZ_CARDS_PER_PAGE);

  const categoryRenderInfo = catPaginationHelper(quizzes, page, QUIZ_CARDS_PER_PAGE, totalQuizzes);

  res.render('categories', {
    pageTitle: "Sport Quizzes",
    ...categoryRenderInfo,
  });
};

exports.getAllQuizzes = async (req, res, next) => {
  const page = +req.query.page || 1;
  let totalQuizzes;
  const numofQuizzes = await Quiz.find().countDocuments();
  totalQuizzes = numofQuizzes;
  const quizzes = await Quiz.find()
    .skip((page - 1) * QUIZ_CARDS_PER_PAGE)
    .limit(QUIZ_CARDS_PER_PAGE);

  const categoryRenderInfo = catPaginationHelper(quizzes, page, QUIZ_CARDS_PER_PAGE, totalQuizzes);

  res.render('categories', {
    pageTitle: "All Quizzes",
    ...categoryRenderInfo,
  });
};


exports.postUserQuizScore = async (req, res, next) => {
  const quiz = req.body.quizId;
  const latestScore = req.body.score;
  const userId = req.body.userId;
  const quizObj = { quiz, score: latestScore };
  const user = await User.findById(userId);

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
  console.log('quiz posted');
  res.end();
}

