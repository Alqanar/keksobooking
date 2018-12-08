'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var templateError = document.querySelector('#error').content.querySelector('.error');

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

    displayError: function (error) {
      var cloneErrorMessage = templateError.cloneNode(true);

      cloneErrorMessage.querySelector('.error__message').textContent = error;

      document.querySelector('main').appendChild(cloneErrorMessage);
    }
  };
})();
