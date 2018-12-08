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

  window.backend = {
    getData: function (loadCallback, errorCalback) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';
      xhr.timeout = 1000;

      xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
      xhr.send();

      xhr.addEventListener('load', function () {
        processingServerResponse(xhr, loadCallback, errorCalback);
      });
      xhr.addEventListener('error', function () {
        errorCalback('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        errorCalback('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
    },

    sendData: function (data, loadCallback, errorCalback) {
      var xhr = new XMLHttpRequest();

      xhr.timeout = 1000;

      xhr.open('POST', 'https://js.dump.academy/keksobooking');
      xhr.send(data);

      xhr.addEventListener('load', function () {
        processingServerResponse(xhr, loadCallback, errorCalback);
      });
      xhr.addEventListener('error', function () {
        errorCalback('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        errorCalback('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
    }
  };
})();

