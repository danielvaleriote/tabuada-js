"use strict";

const byId = id => document.getElementById(id); // Gets an element by ID

// input methods
const validateInput = ({value}) => value && Number(value) !== 0;
const cleanInput = i => i.value = "";

const quizWrapper = byId("quizWrapper")
const pickNumberF = byId("pickNumberF");

const answerForm = byId("answerForm");
const answerInput = byId("answerInput");

const pickNumberInput = byId("pickNumberInput");

const multiplicands = [2,3,4,5,6,7,8,9];
let currMultiplicands;

let chosenNumber;
let allQuestions;
let currMultiplicand;
let wrongAnswersCount = 0;
let state = "idle";

const pickNumber = e => {
	e.preventDefault();
	if(!validateInput(pickNumberInput)) return;
	currMultiplicands = [...multiplicands]
	chosenNumber = Number(pickNumberInput.value);
	wrongAnswersCount = 0;
	quizWrapper.style.display = "flex";

	updateOperation();
	cleanInput(pickNumberInput);
	updateState("answering");
	hideResult();
};

const submitAnswer = e => {
	e.preventDefault();
	if(!validateInput(answerInput)) return;
	const n = Number(answerInput.value);
	if(chosenNumber * currMultiplicand === n) {
		// if the answer is right
		displayAnswerResult(true);
		updateOperation();
	} else {
		// if the answer is wrong
		displayAnswerResult(false);
		createModal("Resposta incorreta.", 1800);

		quizWrapper.classList.add("wrong-answer");
		wrongAnswersCount++;
	};
	cleanInput(answerInput);
};

const showResult = () => {
	byId("resultScreen").style.display = "flex";
	let errMessageEl = document.querySelector("#resultScreen .errors-message");
	errMessageEl.innerHTML = `Total de erros: <strong>${wrongAnswersCount}</strong>`;
	errMessageEl.style.color = wrongAnswersCount <= 2 ? "green" : wrongAnswersCount <= 4 ? "yellow" : "#dc3545"; 

	updateState("idle")
};

const hideResult = () => {
	byId("resultScreen").style.display = "none";
}

const displayAnswerResult = isAnswerRight => {
	let cssClass;
	if(isAnswerRight) cssClass = "right-answer";
	else cssClass = "wrong-answer";
	quizWrapper.classList.add(cssClass);
	setTimeout(() => quizWrapper.classList.remove(cssClass), 1000);
};

const pickRandomMultiplicand = () => {
	if(currMultiplicands.length == 0) {
		currMultiplicands = [...multiplicands];
		return showResult();
	};
	return currMultiplicands.splice(Math.floor(Math.random() * currMultiplicands.length), 1)[0];
};

const updateOperation = () => {
	if(currMultiplicands.length === 0) return showResult();

	currMultiplicand = pickRandomMultiplicand();
	byId("firstNumber").innerText = chosenNumber;
	byId("secondNumber").innerText = currMultiplicand;
};

const updateState = (state) => {
	switch(state) {
		case "idle":
			document.querySelector("#pickNumberF button").classList.remove("inactive-btn");
			pickNumberInput.focus()
			break;

		case "answering":
			document.querySelector("#pickNumberF button").classList.add("inactive-btn");
			answerInput.focus()
			break;
		}
}

const createModal = (modalMessage, modalDuration, modalBgColor, modalTextColor) => {
	// Create, define id and insert text inside modal
	let modal = document.createElement("div");
	modal.id = "modal"; modal.innerText = modalMessage;
	// Modal custom style
	if(modalBgColor) modal.style.backgroundColor = modalBgColor;
	if(modalTextColor) modal.style.color = modalTextColor;
	// Append modal to modalContainer
	byId("modalContainer").appendChild(modal); 
	// Deletes modal after specified time
	if(Number(modalDuration))
	setTimeout(() => deleteModal(), Number(modalDuration));
};

const deleteModal = () => {
	let modal = byId("modal");
	// Slide modal out of the screen
	modal.classList.add("slide-out-modal");
	setTimeout(() => modal.remove(), 1800);
};

pickNumberF.addEventListener("submit", pickNumber);
answerForm.addEventListener("submit", submitAnswer);