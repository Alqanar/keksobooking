'use strict';

(function () {
  var templateError = document.querySelector('#error').content.querySelector('.error');

  function displayError(error) {
    var cloneErrorMessage = templateError.cloneNode(true);

    cloneErrorMessage.querySelector('.error__message').textContent = error;

    document.querySelector('main').appendChild(cloneErrorMessage);
  }

  window.backend.getData(
      function (data) {
        window.data = data;
        for (var i = 0; i < data.length; i++) {
          data[i].id = i;
        }
      },
      displayError
  );
})();
