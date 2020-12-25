const startBtn = document.querySelector('.start-quiz-btn');
const duringBtn = document.querySelector('.during-quiz-btn');

const quizStartCard = document.querySelector('.quiz-start');
const quizDuringCard = document.querySelector('.quiz-during');
const quizEndCard = document.querySelector('.quiz-end');

const secLeftDisplay = document.querySelector('#seconds-left');
const minLeftDisplay = document.querySelector('#minutes-left');

const input = document.querySelector('#answer-input');

let timeForQuiz = document.querySelector('.min-left').innerHTML;
let secLeft = 59;
let minLeft = timeForQuiz - 1;

const aListElements = document.querySelectorAll('.answer-cell-text');
const aListCells = document.querySelectorAll('.answer-cell');

const alreadyAnswered = document.querySelector('.already-guessed');

let totalCorrect = 0;
const liveScore = document.querySelector('.total-correct-during');
const endScore = document.querySelector('.total-correct-end');


startBtn.addEventListener('click', () => {
  countDown();
  quizStartCard.classList.add('hide');
  quizDuringCard.classList.add('active');
  // document.querySelector('.score-live').classList.add('active');
  // setTimeout(endQuizTime, (minLeft * 60000) + ((secLeft + 1) * 1000));
})

duringBtn.addEventListener('click', () => {
  quizEnd();
  endScore.innerHTML = totalCorrect;
})



const quizEnd = () => {
  quizDuringCard.classList.remove('active');
  quizDuringCard.classList.add('hide');
  quizEndCard.classList.add('active');
  endScore.innerHTML = totalCorrect

  aListCells.forEach((element, index) => {
    if (!element.classList.contains('answer-correct')) {
      element.classList.add('answer-wrong');
      element.childNodes[1].classList.add('active');
    }
  });

  console.log(aListCells[1].children);

}

const countDown = () => {
  setInterval(() => {
    if (secLeft === 0 && minLeft === 0) {
      quizEnd();
    }
    if (secLeft < 0) {
      clearInterval((secLeft = 59));
      minLeft--;
    }
    secLeftDisplay.innerHTML = secLeft;
    if (secLeft < 10) {
      secLeftDisplay.innerHTML = "0" + secLeft;
    }
    secLeft -= 1;
    minLeftDisplay.innerHTML = minLeft;
  }, 1000);
}

let inputAnswer = [];

input.addEventListener("input", (event) => {
  inputAnswer.push(event.target.value.trim());
  if (inputAnswer.length > 1) {
    inputAnswer.shift();
  }
  aListElements.forEach((aListElement, index) => {
    if ((aListElement.innerHTML == inputAnswer) && (aListElement.classList.contains('active')) ||
      (aListElement.innerHTML.toLowerCase() == inputAnswer) && (aListElement.classList.contains('active'))) {
      alreadyAnswered.classList.add('active');
    }

    if ((aListElement.innerHTML == inputAnswer) && (!aListElement.classList.contains('active')) ||
      (aListElement.innerHTML.toLowerCase() == inputAnswer) && (!aListElement.classList.contains('active'))) {
      aListElement.parentElement.classList.add('answer-correct');
      aListElement.classList.add('active');
      input.value = "";
      alreadyAnswered.classList.remove('active');
      totalCorrect++;
      liveScore.innerHTML = totalCorrect;
    }
  })
  if (totalCorrect == aListElements.length) {
    quizEnd();
  }
})

