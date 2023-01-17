"use strict";

function Themes(index) {
  var returnAll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var allThemes = [{
    name: 'dark',
    bodyBg: 'rgb(6, 5, 21)',
    bodyBgImage: 'none',
    textColorDefault: 'rgb(189, 215, 238)',
    textColorDim: 'rgb(127, 127, 127)',
    textColorBold: 'rgb(255, 217, 102)',
    menuBg: 'rgb(30, 37, 46)',
    bannerBg: 'rgba(6, 5, 21, 0.7)',
    classWrongBg: 'rgb(95, 0, 0)',
    classRightBg: 'rgb(0, 114, 154)',
    classDefaultBg: 'rgb(127, 127, 127)',
    btnColorDefault: 'rgb(0, 0, 0)'
  }, {
    name: 'light',
    bodyBg: 'rgb(200, 200, 230)',
    bodyBgImage: 'none',
    textColorDefault: 'rgb(0, 0, 0)',
    textColorDim: 'rgb(89, 89, 89)',
    textColorBold: 'rgb(0, 32, 96)',
    menuBg: 'rgb(208, 206, 206)',
    bannerBg: 'rgba(200, 200, 200, 0.7)',
    classWrongBg: 'rgb(255, 0, 0)',
    classRightBg: 'rgb(0, 176, 240)',
    classDefaultBg: 'rgb(217, 217, 217)',
    btnColorDefault: 'rgb(0, 0, 0)'
  }, {
    name: 'blue',
    bodyBg: 'rgb(6, 5, 21)',
    bodyBgImage: 'url("/Images/bg.jpg")',
    textColorDefault: 'rgb(189, 215, 238)',
    textColorDim: 'rgb(127, 127, 127)',
    textColorBold: 'rgb(255, 217, 102)',
    menuBg: 'rgb(30, 37, 46)',
    bannerBg: 'rgba(13, 43, 82, 0.7)',
    classWrongBg: 'rgb(95, 0, 0)',
    classRightBg: 'rgb(0, 114, 154)',
    classDefaultBg: 'rgb(127, 127, 127)',
    btnColorDefault: 'rgb(0, 0, 0)'
  }];

  if (returnAll) {
    return allThemes;
  }

  return allThemes[index];
}

function ApplyTheme(theme) {
  var r = document.querySelector(':root');
  var themePropertyNames = ['bodyBg', 'bodyBgImage', 'textColorDefault', 'textColorDim', 'textColorBold', 'menuBg', 'bannerBg', 'classWrongBg', 'classRightBg', 'classDefaultBg'];

  for (var _i = 0, _themePropertyNames = themePropertyNames; _i < _themePropertyNames.length; _i++) {
    var p = _themePropertyNames[_i];
    r.style.setProperty("--" + p, theme[p]);
  }

  SaveUserTheme(theme.name);
}

(void 0).addEventListener('load', function () {
  document.querySelector('#darkTheme').addEventListener('click', function () {
    ApplyTheme(Themes(0));
  });
  document.querySelector('#lightTheme').addEventListener('click', function () {
    ApplyTheme(Themes(1));
  });
  document.querySelector('#blueTheme').addEventListener('click', function () {
    ApplyTheme(Themes(2));
  });
}); // store user selection in the local storage to be used by other pages
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

function SaveUserTheme(themeName) {
  localStorage.setItem('theme', themeName);
}

function GetUserTheme() {
  var userTheme = localStorage.getItem('theme');
  lg(userTheme);

  if (userTheme === null) {
    return;
  }

  var availableThemes = Themes(0, true);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = availableThemes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var theme = _step.value;

      if (theme.name === userTheme) {
        ApplyTheme(theme);
        break;
      }
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
}