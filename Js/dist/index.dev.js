"use strict";

function lg(o) {
  console.log(o);
}

document.getElementById('goLeft').addEventListener('click', function () {
  ScrollIt(false);
});
document.getElementById('goRight').addEventListener('click', function () {
  ScrollIt(true);
});
var scrollStep = 300,
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
  document.querySelector("#rppOut").innerText = parseInt(document.querySelector("#rppOut").innerText) + (bool == true ? 5 : -5);
}

document.querySelector('#decreaseR').addEventListener('click', function () {
  ResultsPerPage(false);
});
document.querySelector('#increaseR').addEventListener('click', function () {
  ResultsPerPage(true);
});

function ShowIt(classArr, bool) {
  if (bool) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = classArr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var cl = _step.value;
        document.getElementById(cl).classList.remove('hideit');
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return;
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = classArr[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _cl = _step2.value;
      document.getElementById(_cl).classList.add('hideit');
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}

var menuOn = 0;
document.querySelector('#menuI').addEventListener('click', function () {
  menuOn = (menuOn + 1) % 2;
  ShowIt(['menuWrapper'], menuOn);
});
document.querySelector('#closeMenu').addEventListener('click', function () {
  document.querySelector('#menuI').click();
});