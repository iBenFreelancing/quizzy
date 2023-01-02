"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var quizz = [{
  quizz: "which of the following is not a JavasSript data type?",
  o1: "String",
  o2: "Logic",
  o3: "Number",
  o4: "script",
  ans: ['o2', 'o4']
}, {
  quizz: "Which of the following is a JavaScript declearation keyword?",
  o1: "const",
  o2: "let",
  o3: "vars",
  o4: "function",
  ans: ['o1', 'o2', 'o4']
}, {
  quizz: "What will the code below return? function (){return void}",
  o1: "undefined",
  o2: "null",
  o3: "err",
  o4: "th function itself",
  ans: ['o2']
}, {
  quizz: "what will be logged onto the console. { let x = 3; function twist() {(x=5); x += 2;} console.log(x--)}",
  o1: "3",
  o2: "2",
  o3: "7",
  o4: "6",
  ans: ['o2']
}, {
  quizz: "How do you select an element with id 'txt' using vanilla JavaScript? ",
  o1: "document.getElementById('txt')",
  o2: "document.getElementByAttribute(id = 'txt')",
  o3: "DOM.getElementByAttribute(id = 'txt')",
  o4: "document.querySelector('#txt')",
  ans: ['o1', '04']
}];
var qo = {
  quizz: "question",
  o1: "option A",
  o2: "option B",
  o3: "option C",
  o4: "option D",
  ans: ['o2']
};

var Test = function Test() {
  _classCallCheck(this, Test);

  this.data = {
    q: [],
    // array of questions that user attempted
    currentQuizz: {
      id: '',
      ans: [],
      answered: false,
      userChoice: []
    }
  };
  this.quizz = document.querySelector('');
  this.o1 = document.querySelector('');
  this.o2 = document.querySelector('');
  this.o3 = document.querySelector('');
  this.o4 = document.querySelector('');
};