const addQuestionBtn = document.querySelector('.add-question');
const removeQuestionBtn = document.querySelector('.remove-question');
const createQuizTable = document.querySelector('.create-quiz-table');
const quizType = document.getElementById('quiz-type');
console.log(quizType.innerHTML)

let numOfRows;





// MC STUFF

let numQuestionsMC = 0;
const mcQuestionList = document.querySelectorAll('.mc-question');





//inserts rows in table when user wants to add questions
addQuestionBtn.addEventListener('click', () => {
  let row = createQuizTable.insertRow(-1);
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

  if (quizType.innerHTML == 'Type C') {
    mcQuestionList[numQuestionsMC].innerHTML = mCQTemplate;
    const mcQuizNum = document.querySelectorAll('.mc-quiz-num');
    mcQuizNum[numQuestionsMC].innerHTML = numQuestionsMC + 2;
    numQuestionsMC++;
  }


}


//removes rows when use wants to remove question
removeQuestionBtn.addEventListener('click', () => {
  if ((quizType.innerHTML === "Type A") || (quizType.innerHTML === 'Type B')) {
    const createQuizTable = document.querySelector('.create-quiz-table');
    let row = createQuizTable.deleteRow(-1);
    numOfRows--;
  }

})
numOfRows = createQuizTable.rows.length;

// console.log(createQuizTable.rows[0].cells)
// console.log(createQuizTable.rows[numOfRows])



const mCQTemplate = `
<table class="table-quiz create-quiz-table multi-choice">
	<tr>
		<th class="mc-quiz-num"></th>
		<th>Question</th>
		<th>Answer</th>
		<th>Correct</th>
	</tr>
	<tr>
		<td></td>
		<td>
			<div class="form-control">
				<input
					type="text"
					name="question"
					id="question"
					placeholder="1"
				/>
			</div>
		</td>
		<td>
			<div class="form-control">
				<input
					type="text"
					name="answer"
					id="answer"
					placeholder="Answer 1"
				/>
			</div>
		</td>
		<td>
			<div class="form-control">
				<input type="radio" name="answer" id="answer" />
			</div>
		</td>
	</tr>
	<tr>
		<td></td>
		<td>
			<div class="form-control">
				<input
					type="text"
					name="question"
					id="question"
					placeholder="2"
				/>
			</div>
		</td>
		<td>
			<div class="form-control">
				<input
					type="text"
					name="answer"
					id="answer"
					placeholder="Answer 2"
				/>
			</div>
		</td>
		<td>
			<div class="form-control">
				<input type="radio" name="answer" id="answer" />
			</div>
		</td>
	</tr>
	<tr>
		<td></td>
		<td>
			<div class="form-control">
				<input
					type="text"
					name="question"
					id="question"
					placeholder="3"
				/>
			</div>
		</td>
		<td>
			<div class="form-control">
				<input
					type="text"
					name="answer"
					id="answer"
					placeholder="Answer 3"
				/>
			</div>
		</td>
		<td>
			<div class="form-control">
				<input type="radio" name="answer" id="answer" />
			</div>
		</td>
	</tr>
	<tr>
		<td></td>
		<td>
			<div class="form-control">
				<input
					type="text"
					name="question"
					id="question"
					placeholder="4"
				/>
			</div>
		</td>
		<td>
			<div class="form-control">
				<input
					type="text"
					name="answer"
					id="answer"
					placeholder="Answer 4"
				/>
			</div>
		</td>
		<td>
			<div class="form-control">
				<input type="radio" name="answer" id="answer" />
			</div>
		</td>
	</tr>
</table>

`