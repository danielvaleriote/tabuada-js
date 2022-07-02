"use strict";

const byId = id => document.getElementById(id); // Gets an element by ID

const validateInput = ({value}) => {
	if(value && Number(value) !== 0) return true;
	return false;
};

const cleanInput = i => i.innerText = "";

const pickNumberF = byId("pickNumberF");

const answerForm = byId("answerForm");
const answerInput = byId("answerInput");

const pickNumberInput = byId("pickNumberInput");
const quizWrapper = byId("quizWrapper");

const firstN = byId("firstNumber"); //first number <span>
const secondN = byId("secondNumber"); //second *

var chosenNumber;
var allQuestions;

const pickNumber = e => {
	e.preventDefault();
	if(!validateInput(pickNumberInput)) return;
	chosenNumber = Number(pickNumberInput.value);
	console.log(chosenNumber);
};

const submitAnswer = e => {
	e.preventDefault();
	if(!validateInput(answerInput)) return;
	const n = Number(answerInput.value);
	console.log(n);
};

pickNumberF.addEventListener("submit", pickNumber);
answerForm.addEventListener("submit", submitAnswer);