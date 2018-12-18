'use strict';

(function () {
  function processingServerResponse(xhr, loadCallback, errorCalback) {
    var error;
    var Code = {
      SUCCESS: 200,
      WRONG_REQUEST: 400,
      USER_NOT_AUTHORIZED: 401,
      NOT_FOUND_ERROR: 404,
      SERVER_ERROR: 500
    };

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
      errorCalback(error);
    }
  }

  function performRequest(params) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = 1000;

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
    getData: function (loadCallback, errorCalback) {
      performRequest({
        lade: loadCallback,
        displayMistake: errorCalback,
        type: 'GET',
        url: 'https://js.dump.academy/keksobooking/data'}
      );
    },

    sendData: function (data, loadCallback, errorCalback) {
      performRequest({
        facts: data,
        lade: loadCallback,
        displayMistake: errorCalback,
        type: 'POST',
        url: 'https://js.dump.academy/keksobooking'}
      );
    }
  };
})();

