'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500;

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
    },

    specifyId: function (info) {
      for (var i = 0; i < info.length; i++) {
        info[i].id = i;
      }
    },

    debounce: function (cb) {
      var lastTimeout = null;

      return function () {
        var parameters = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          cb.apply(null, parameters);
        }, DEBOUNCE_INTERVAL);
      };
    }
  };
})();
