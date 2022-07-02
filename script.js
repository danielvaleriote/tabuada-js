"use strict";

const byId = id => document.getElementById(id); // Gets an element by ID

const pickNumberF = byId("pickNumberF");

const answerForm = byId("answerForm");
const answerInput = byId("answerInput");

const pickIdInput = byId("pickIdInput");
const quizWrapper = byId("quizWrapper");

const firstN = byId("firstNumber"); //first number <span>
const secondN = byId("secondNumber"); //second *

const pickNumber = e => {
	e.preventDefault();
	console.log(e);
};

const submitAnswer = e => {
	e.preventDefault()
	console.log(e)
}

pickNumberF.addEventListener("submit", pickNumber);
answerForm.addEventListener("submit", submitAnswer);