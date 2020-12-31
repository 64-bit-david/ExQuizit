const addQuestionBtn = document.querySelector('.add-question');
const removeQuestionBtn = document.querySelector('.remove-question');
const createQuizTable = document.querySelector('.create-quiz-table');
const quizType = document.getElementById('quiz-type');
console.log(quizType.innerHTML)

let numOfRows;

//new row var info





//

// const row = createQuizTable.insertRow(-1);


addQuestionBtn.addEventListener('click', () => {
  const row = createQuizTable.insertRow(-1);
  numofRows = createQuizTable.rows.length;
  numOfRows++;
  qCLastRowStyler();
})

//inserts rows in table when user wants to add questions
const qCLastRowStyler = () => {

  if (quizType.innerHTML === 'Type A') {
    const cell1Value = numOfRows - 1;

    let lastRow = createQuizTable.rows[numOfRows - 1];

    const cell1 = lastRow.insertCell(0);
    const cell2 = lastRow.insertCell(1);
    const cell3 = lastRow.insertCell(2);

    cell1.innerHTML = cell1Value;
    cell2.innerHTML = '<div class="form-control"></div>'
    cell2.childNodes[0].innerHTML = '<input>';
    cell2.childNodes[0].childNodes[0].setAttribute('type', 'text');
    cell2.childNodes[0].childNodes[0].setAttribute('name', 'question');
    cell2.childNodes[0].childNodes[0].setAttribute('id', 'question');
    cell2.childNodes[0].childNodes[0].setAttribute('placeholder', `Question ${cell1Value}`);

    cell3.innerHTML = '<div class="form-control"></div>'
    cell3.childNodes[0].innerHTML = '<input>';
    cell3.childNodes[0].childNodes[0].setAttribute('type', 'text');
    cell3.childNodes[0].childNodes[0].setAttribute('name', 'answer');
    cell3.childNodes[0].childNodes[0].setAttribute('id', 'answer');
    cell3.childNodes[0].childNodes[0].setAttribute('placeholder', `Answer ${cell1Value}`);
  }

  if (quizType.innerHTML == 'Type B') {

    const cell1Value = numOfRows - 1;
    let lastRow = createQuizTable.rows[numOfRows - 1];
    const cell1 = lastRow.insertCell(0);
    const cell2 = lastRow.insertCell(1);

    cell1.innerHTML = cell1Value;
    cell2.innerHTML = '<div class="form-control"></div>'
    cell2.childNodes[0].innerHTML = '<input>';
    cell2.childNodes[0].childNodes[0].setAttribute('type', 'text');
    cell2.childNodes[0].childNodes[0].setAttribute('name', 'answer');
    cell2.childNodes[0].childNodes[0].setAttribute('id', 'answer');
    cell2.childNodes[0].childNodes[0].setAttribute('placeholder', `Answer ${cell1Value}`);
  }




}

//removes rows when use wants to remove question
removeQuestionBtn.addEventListener('click', () => {
  const createQuizTable = document.querySelector('.create-quiz-table');
  const row = createQuizTable.deleteRow(-1);
  numOfRows--;
})
numOfRows = createQuizTable.rows.length;

// console.log(createQuizTable.rows[0].cells)
// console.log(createQuizTable.rows[numOfRows])

