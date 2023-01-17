"use strict";

// console log shortenner
function lg(o) {
  console.log(o);
}

var scrollStep = 200,
    currentScroll = 0;

function ScrollIt(bool) {
  // false scrolls leftward and true rightward   
  if (bool) {
    currentScroll += scrollStep;
  } else {
    currentScroll -= scrollStep;
  }

  var elm = document.querySelector('.h-scrollable');

  if (currentScroll > elm.scrollWidth) {
    currentScroll = elm.scrollWidth;
  }

  if (currentScroll < 0) {
    currentScroll = 0;
  }

  elm.scroll({
    top: 0,
    left: currentScroll,
    behavior: 'smooth'
  });
}

function ResultsPerPage(bool) {
  // true steps up while false steps down
  var elm = document.querySelector("#searchResultsPerPage");

  if (bool) {
    elm.innerText = parseInt(elm.innerText) + 5 > 20 ? 5 : parseInt(elm.innerText) + 5;
    return;
  }

  elm.innerText = parseInt(elm.innerText) - 5 <= 0 ? 20 : parseInt(elm.innerText) - 5;
}

(void 0).addEventListener('load', function () {
  var menuToggler = new ShowIt('click', ['menuI', 'closeMenu'], 'menuWrapper', true);
  document.querySelector('#decreaseR').addEventListener('click', function () {
    ResultsPerPage(false);
  });
  document.querySelector('#increaseR').addEventListener('click', function () {
    ResultsPerPage(true);
  });
  document.getElementById('goLeft').addEventListener('click', function () {
    ScrollIt(false);
  });
  document.getElementById('goRight').addEventListener('click', function () {
    ScrollIt(true);
  });
});