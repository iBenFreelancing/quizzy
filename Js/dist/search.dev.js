"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
  pagingInfo.count += 1;
  return "\n        <div class=\"item-x\">\n            <span class=\"course\">".concat(pagingInfo.count, ". &nbsp ").concat(singleResult.courseName, " / ").concat(singleResult.b + singleResult.i + singleResult.a, "</span>\n            <div class=\"q-options\">\n                <span class=\"b-l\" title=\"beginner\" data-cid = \"").concat(singleResult.courseId, "-").concat(singleResult.courseName, "-Beginner\" onclick=\"SetUserSelection(this.dataset.cid)\"><img src=\"/Images/appleBlue.png\" width=\"70px\" height=\"auto\" alt=\"beginner\"> <small>").concat(singleResult.b, "</small></span>\n                <span class=\"i-l\" title=\"intermediate\" data-cid = \"").concat(singleResult.courseId, "-").concat(singleResult.courseName, "-Intermediate\" onclick=\"SetUserSelection(this.dataset.cid)\"><img src=\"/Images/appleGrey.png\" width=\"70px\" height=\"auto\" alt=\"intermediate\"><small>").concat(singleResult.i, "</small></span>\n                <span class=\"a-l\" title=\"advance\" data-cid = \"").concat(singleResult.courseId, "-").concat(singleResult.courseName, "-Advance\" onclick=\"SetUserSelection(this.dataset.cid)\"><img src=\"/Images/appleGrey.png\" width=\"70px\" height=\"auto\" alt=\"advance\"> <small>").concat(singleResult.a, "</small></span>\n            </div>\n        </div> \n    ");
}

function AppendSearchResult(pageR) {
  var parentDiv = document.querySelector('#searchResult');
  parentDiv.innerHTML = "";
  parentDiv.innerHTML = "<h3>Search Result</h3> ".concat(CreateResultDiv(pageR).join(""));

  if (pageR.length === 0) {
    parentDiv.innerHTML = "<h3>Search Result</h3><h3>Opps!!! No results were found</h3><br/><u><h4 onclick =\"GetAllResult()\">Click here to see a list of all available courses</h4></u>";
  }

  parentDiv.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

(void 0).addEventListener('load', function () {
  document.querySelector('#search').addEventListener('change', function () {
    AppendSearchResult(GetResult(Result));
  });
  GetAllResult();
  document.querySelector('#search').scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });
  GetUserTheme();
});

function GetResult(database) {
  var keyword = document.querySelector('#search').value;
  document.querySelector('#search').value = "";
  batchResult = [];
  batchResult = database.filter(function (itemx) {
    return itemx.courseName.toLocaleLowerCase().includes(keyword.toLocaleLowerCase());
  });
  SetResultPaging();
  return GetOneResultPage(1);
}
/*
determine the number of groups result can be divided into
create buttons that correspond the groups above
attached event listerner to each btn
load btn set of result onclick
*/


batchResult = [1, 2, 3, 2, 3, 4, 4, 5, 6, 7, 8, 8, 9, 0];
var pagingInfo = {
  currentPage: "",
  totalPages: "",
  count: 0
};

function SetResultPaging() {
  var rpp = document.querySelector('#searchResultsPerPage').innerText;
  var numberOfPages = Math.floor(batchResult.length / rpp);
  var extraResult = batchResult.length % rpp;

  if (extraResult >= 1) {
    numberOfPages++;
    CreateBtn(numberOfPages);
    pagingInfo.totalPages = numberOfPages;
    return;
  }

  if (numberOfPages >= 1) {
    CreateBtn(numberOfPages);
    pagingInfo.totalPages = numberOfPages;
  }
}

function CreateBtn(numberOfBtn) {
  var btns = [];

  for (var i = 1; i <= numberOfBtn; i++) {
    btns.push("<button onclick = \"GetThePage(this.innerText)\">".concat(i, "</button>"));
  }

  document.querySelector('#hScrollable').innerHTML = btns.join("");
}

function GetOneResultPage() {
  var pageNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  pageNumber--;
  var rpp = document.querySelector('#searchResultsPerPage').innerText;
  var lowerLimit = parseInt(rpp) * pageNumber;
  var upperLimit = lowerLimit + (parseInt(rpp) - 1);

  if (upperLimit >= batchResult.length) {
    upperLimit = batchResult.length - 1;
  }

  var resultSet = [];

  for (lowerLimit; lowerLimit <= upperLimit; lowerLimit++) {
    resultSet.push(batchResult[lowerLimit]);
  }

  pagingInfo.currentPage = pageNumber + 1;
  pagingInfo.count = pageNumber * parseInt(rpp);
  document.querySelector('#resultHint').innerText = "Showing ".concat(pagingInfo.currentPage, " of ").concat(pagingInfo.totalPages, " pages");
  return resultSet;
}

function GetThePage() {
  var pageNo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var rs = GetOneResultPage(pageNo);
  AppendSearchResult(rs);
}

function GetAllResult() {
  batchResult = _toConsumableArray(Result);
  SetResultPaging();
  GetThePage(pageNo = 1);
}