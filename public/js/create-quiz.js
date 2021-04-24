const addQuestionBtn = document.querySelector('.add-question');
const removeQuestionBtn = document.querySelector('.remove-question');
const createQuizTable = document.querySelector('.create-quiz-table');
const quizType = document.getElementById('quiz-type');
const postCreateBtn = document.querySelector('.quiz-creator-btn.post-created-quiz');
const postCreateError = document.querySelector('.create-q-err');
const postCreateError2 = document.querySelector('.create-q-err-empty');
const quizTitle = document.querySelector('.create-q-r-input#title');
const quizDesc = document.querySelector('.create-q-r-input#description');

let totalQuestions = 5;
let numOfRows;

if (quizType.innerHTML === 'Type A') {
	answerInputs = document.querySelectorAll('.create-q-input#question')
}




//validation 
postCreateBtn.addEventListener('mouseenter', () => {
	let answerInputs = document.querySelectorAll('.create-q-input#answer');
	let answerInputsWithText = 0;
	answerInputs.forEach(input => {
		if (input.value !== "") {
			answerInputsWithText++;
		}
	})
	if (answerInputsWithText < 5) {
		postCreateError.classList.remove('hide');
		postCreateBtn.type = 'button';
	}


	if (answerInputsWithText < answerInputs.length
		|| quizDesc.value === ""
		|| quizTitle.value === ""
	) {
		postCreateError2.classList.remove('hide');
		postCreateBtn.type = 'button';
	}

	if (quizType.innerHTML === "Type A") {
		let questionInputs = document.querySelectorAll('.create-q-input#question');
		let questionInputsWithText = 0;
		questionInputs.forEach(input => {
			if (input.value !== "") {
				questionInputsWithText++;
			}
		})
		if ((questionInputsWithText < questionInputs.length)
			|| quizDesc.value === ""
			|| quizTitle.value === ""
		) {
			postCreateError2.classList.remove('hide');
			postCreateBtn.type = 'button';
		}
	}

})

postCreateBtn.addEventListener('mouseleave', () => {
	postCreateError.classList.add('hide');
	postCreateError2.classList.add('hide');
	postCreateBtn.type = 'submit';

})









//inserts rows in table when user wants to add questions
addQuestionBtn.addEventListener('click', () => {
	let row = createQuizTable.insertRow(-1);
	numofRows = createQuizTable.rows.length;
	numOfRows++;
	qCLastRowStyler();
	totalQuestions++;

});

//removes rows when use wants to remove question
removeQuestionBtn.addEventListener('click', () => {
	if ((quizType.innerHTML === "Type A") || (quizType.innerHTML === 'Type B')) {
		const createQuizTable = document.querySelector('.create-quiz-table');
		let row = createQuizTable.deleteRow(-1);
		numOfRows--;
		totalQuestions--;
		questionInputs = document.querySelectorAll('.create-q-input#answer');
	}
})
numOfRows = createQuizTable.rows.length;



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
		cell2.childNodes[0].childNodes[0].setAttribute('class', 'create-q-input');
		cell2.childNodes[0].childNodes[0].setAttribute('class', 'create-q-input');
		cell2.childNodes[0].childNodes[0].setAttribute('placeholder', `Question ${cell1Value}`);
		cell2.childNodes[0].childNodes[0].setAttribute('title', `question-${cell1Value}`);

		cell3.innerHTML = '<div class="form-control"></div>'
		cell3.childNodes[0].innerHTML = '<input>';
		cell3.childNodes[0].childNodes[0].setAttribute('type', 'text');
		cell3.childNodes[0].childNodes[0].setAttribute('name', 'answer');
		cell3.childNodes[0].childNodes[0].setAttribute('id', 'answer');
		cell3.childNodes[0].childNodes[0].setAttribute('class', 'create-q-input');
		cell3.childNodes[0].childNodes[0].setAttribute('placeholder', `Answer ${cell1Value}`);
		cell3.childNodes[0].childNodes[0].setAttribute('title', `answer-${cell1Value}`);

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
		cell2.childNodes[0].childNodes[0].setAttribute('class', 'create-q-input');
		cell2.childNodes[0].childNodes[0].setAttribute('placeholder', `Answer ${cell1Value}`);
		cell2.childNodes[0].childNodes[0].setAttribute('title', `answer-${cell1Value}`);

	}

	if (quizType.innerHTML == 'Type C') {
		mcQuestionList[numQuestionsMC].innerHTML = mCQTemplate;
		const mcQuizNum = document.querySelectorAll('.mc-quiz-num');
		mcQuizNum[numQuestionsMC].innerHTML = numQuestionsMC + 2;
		numQuestionsMC++;
	}
}







//Attemps at mulitpchoice 
let numQuestionsMC = 0;
const mcQuestionList = document.querySelectorAll('.mc-question');




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