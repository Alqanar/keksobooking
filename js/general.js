'use strict';

(function () {
  window.switchDisabledField = function (element) {
    var elems = element.querySelectorAll('.' + element.className.replace(' ', '.') + ' > *');

    for (var i = 0; i < elems.length; i++) {
      elems[i].disabled = !elems[i].disabled;
    }
  };
})();
