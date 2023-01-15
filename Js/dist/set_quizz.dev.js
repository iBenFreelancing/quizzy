"use strict";

(void 0).addEventListener('load', function () {
  var category = new MultiOption(['QLbeginner', 'QLintermediate', 'QLadvance'], 'QLbeginner', applySettings);
  var answers = new MultiOption(['anso1', 'anso2', 'anso3', 'anso4']);
});

function applySettings(icid) {
  alert(icid);
}