'use strict';

(function () {
  function processingServerResponse(xhr, loadCallback, errorCalback) {
    var error;

    switch (xhr.status) {
      case 200:
        loadCallback(xhr.response);
        break;

      case 400:
        error = 'Неверный запрос';
        break;
      case 401:
        error = 'Пользователь не авторизован';
        break;
      case 404:
        error = 'Запрашиваемый ресурс не найден';
        break;
      case 500:
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
      processingServerResponse(xhr, params.lade, params.mistake);
    });
    xhr.addEventListener('error', function () {
      params.mistake('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      params.mistake('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
  }

  window.backend = {
    getData: function (loadCallback, errorCalback) {
      performRequest({
        lade: loadCallback,
        mistake: errorCalback,
        type: 'GET',
        url: 'https://js.dump.academy/keksobooking/data'}
      );
    },

    sendData: function (data, loadCallback, errorCalback) {
      performRequest({
        facts: data,
        lade: loadCallback,
        mistake: errorCalback,
        type: 'POST',
        url: 'https://js.dump.academy/keksobooking'}
      );
    }
  };
})();

