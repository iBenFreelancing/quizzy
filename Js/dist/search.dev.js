"use strict";

var CreateResultDiv = function CreateResultDiv(arrResultItems) {
  var divs = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = arrResultItems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var resultX = _step.value;
      divs.push(CreateDivComponent(resultX));
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

  return divs;
}; // {courseId: "", courseName: "JavaScript", b:254, i:173, a:127}


function CreateDivComponent(singleResult) {
  return "\n        <div class=\"item-x\">\n            <span class=\"course\">".concat(singleResult.courseName, " / ").concat(singleResult.b + singleResult.i + singleResult.a, "</span>\n            <div class=\"q-options\">\n                <span class=\"b-l\" title=\"beginner\" data-cid = \"").concat(singleResult.courseId, "-").concat(singleResult.courseName, "-Beginner\" onclick=\"SetUserSelection(this.dataset.cid)\"><img src=\"/Images/appleBlue.png\" width=\"70px\" height=\"auto\" alt=\"beginner\"> <small>").concat(singleResult.b, "</small></span>\n                <span class=\"i-l\" title=\"intermediate\" data-cid = \"").concat(singleResult.courseId, "-").concat(singleResult.courseName, "-Intermediate\" onclick=\"SetUserSelection(this.dataset.cid)\"><img src=\"/Images/appleGrey.png\" width=\"70px\" height=\"auto\" alt=\"intermediate\"><small>").concat(singleResult.i, "</small></span>\n                <span class=\"a-l\" title=\"advance\" data-cid = \"").concat(singleResult.courseId, "-").concat(singleResult.courseName, "-Advance\" onclick=\"SetUserSelection(this.dataset.cid)\"><img src=\"/Images/appleGrey.png\" width=\"70px\" height=\"auto\" alt=\"advance\"> <small>").concat(singleResult.a, "</small></span>\n            </div>\n        </div> \n    ");
}

function AppendSearchResult(availableData) {
  var searchResult = GetResult(availableData);
  var parentDiv = document.querySelector('#searchResult');
  parentDiv.innerHTML = "";
  parentDiv.innerHTML = "<h3>Search Result</h3> ".concat(CreateResultDiv(searchResult).join(""));

  if (searchResult.length === 0) {
    parentDiv.innerHTML = "<h3>Search Result</h3><h3>Opps!!! No results were found</h3><br/><u><h4 onclick =\"AppendSearchResult(Result)\">Click here to see a list of all available courses</h4></u>";
  }

  parentDiv.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

(void 0).addEventListener('load', function () {
  document.querySelector('#search').addEventListener('change', function () {
    AppendSearchResult(Result);
  });
  AppendSearchResult([Result[0], Result[1], Result[2]]);
  document.querySelector('#search').scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });
});

function GetResult(database) {
  var keyword = document.querySelector('#search').value;
  document.querySelector('#search').value = "";
  return database.filter(function (itemx) {
    return itemx.courseName.toLocaleLowerCase().includes(keyword.toLocaleLowerCase());
  });
} // store user selection in the local storage to be used by other pages
// {courseId:'', courseName:'', level: ''}


function SetUserSelection(selection) {
  selection = selection.split("-");
  sessionStorage.setItem('course', JSON.stringify({
    id: selection[0],
    name: selection[1],
    level: selection[2]
  }));
  document.querySelector('#navtoConfirm').click();
}

function NewPage(pageName) {
  window.location.href += pageName;
}