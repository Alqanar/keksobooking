'use strict';

(function () {
  var REQUEST_TIMEOUT = 1000;
  var DATA_SOURSE_URL = 'https://js.dump.academy/keksobooking/data';
  var DATA_SENDING_URL = 'https://js.dump.academy/keksobooking';
  var Code = {
    SUCCESS: 200,
    WRONG_REQUEST: 400,
    USER_NOT_AUTHORIZED: 401,
    NOT_FOUND_ERROR: 404,
    SERVER_ERROR: 500
  };

  function processingServerResponse(xhr, loadCallback, errorCallback) {
    var error;

    switch (xhr.status) {
      case Code.SUCCESS:
        loadCallback(xhr.response);
        break;

      case Code.WRONG_REQUEST:
        error = 'Неверный запрос';
        break;
      case Code.USER_NOT_AUTHORIZED:
        error = 'Пользователь не авторизован';
        break;
      case Code.NOT_FOUND_ERROR:
        error = 'Запрашиваемый ресурс не найден';
        break;
      case Code.SERVER_ERROR:
        error = 'Внутренняя ошибка сервера';
        break;

      default:
        error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
    }

    if (error) {
      errorCallback(error);
    }
  }

  function performRequest(params) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = REQUEST_TIMEOUT;

    xhr.open(params.type, params.url);
    xhr.send(params.facts ? params.facts : undefined);

    xhr.addEventListener('load', function () {
      processingServerResponse(xhr, params.lade, params.displayMistake);
    });
    xhr.addEventListener('error', function () {
      params.displayMistake('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      params.displayMistake('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
  }

  window.backend = {
    getData: function (loadCallback, errorCallback) {
      performRequest({
        lade: loadCallback,
        displayMistake: errorCallback,
        type: 'GET',
        url: DATA_SOURSE_URL}
      );
    },

    sendData: function (data, loadCallback, errorCallback) {
      performRequest({
        facts: data,
        lade: loadCallback,
        displayMistake: errorCallback,
        type: 'POST',
        url: DATA_SENDING_URL}
      );
    }
  };
})();

