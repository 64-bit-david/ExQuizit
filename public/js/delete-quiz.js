//click btn, adds a class 


const deleteQuizPromptCard = document.querySelector('.delete-quiz-card');

let inputList = document.querySelectorAll('.input-id')


let quizId;
let quizElement;
const deleteQuizPrompt = (btn) => {
  deleteQuizPromptCard.classList.toggle('active');
  quizId = btn.previousElementSibling.value;
  quizElement = btn.closest('li');
  console.log(quizElement);
}


const deleteQuizPromptCancel = () => {
  deleteQuizPromptCard.classList.toggle('active');
}

const deleteProduct = (btn) => {
  fetch('/delete-quiz/' + quizId, {
    method: 'DELETE',
  })
    .catch(err => {
      console.log(err);
    })
  deleteQuizPromptCard.classList.remove('active');
  quizElement.remove();


}


