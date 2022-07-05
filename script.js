"use strict";

const byId = id => document.getElementById(id); // Gets an element by ID

// input methods
const validateInput = ({value}) => value && Number(value) !== 0;
const cleanInput = i => i.value = "";

const pickNumberF = byId("pickNumberF");

const answerForm = byId("answerForm");
const answerInput = byId("answerInput");

const pickNumberInput = byId("pickNumberInput");

const multiplicands = [2,3,4,5,6,7,8,9];
let currentMultiplicands = [...multiplicands];

var chosenNumber;
var allQuestions;

const pickNumber = e => {
	e.preventDefault();
	if(!validateInput(pickNumberInput)) return;
	chosenNumber = Number(pickNumberInput.value);
	byId("quizWrapper").style.display = "flex";
	updateOperation();
	cleanInput(pickNumberInput);
};

const submitAnswer = e => {
	e.preventDefault();
	if(!validateInput(answerInput)) return;
	const n = Number(answerInput.value);
};

const showResult = () => {};

const pickRandomMultiplicand = () => {
	if(currentMultiplicands.length == 0) {
		currentMultiplicands = [...multiplicands];
		return showResult();
	};
	return currentMultiplicands.splice(Math.floor(Math.random() * currentMultiplicands.length), 1);
};

const updateOperation = () => {
	byId("firstNumber").innerText = chosenNumber;
	byId("secondNumber").innerText = pickRandomMultiplicand();
};

pickNumberF.addEventListener("submit", pickNumber);
answerForm.addEventListener("submit", submitAnswer);