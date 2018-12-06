'use strict';

(function () {
  var ESC_KEYCODE = 27;

  window.general = {
    switchDisabledField: function (element) {
      var elems = element.querySelectorAll('.' + element.className.replace(' ', '.') + ' > *');

      for (var i = 0; i < elems.length; i++) {
        elems[i].disabled = !elems[i].disabled;
      }
    },

    isEscEvent: function (event, action) {
      if (event.keyCode === ESC_KEYCODE) {
        action();
      }
    }
  };
})();
