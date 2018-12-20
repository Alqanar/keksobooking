'use strict';

(function () {
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var templateSuccess = document.querySelector('#success'). content.querySelector('.success');

  window.displayMessage = function (message, isError) {
    var cloneMessage = (isError ? templateError : templateSuccess).cloneNode(true);

    if (isError) {
      cloneMessage.querySelector('.error__message').textContent = message;
    }

    function closeMessageHandler() {
      document.querySelector(isError ? '.error' : '.success').remove();
      document.removeEventListener('click', closeMessageHandler);
    }

    function closeMessageEscHandler(event) {
      window.general.isEscEvent(event, closeMessageHandler);
      document.removeEventListener('keydown', closeMessageEscHandler);
    }

    document.querySelector('main').appendChild(cloneMessage);
    document.addEventListener('keydown', closeMessageEscHandler);
    document.addEventListener('click', closeMessageHandler);
  };
})();
