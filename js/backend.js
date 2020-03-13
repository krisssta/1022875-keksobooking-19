'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var URL_SAVE = 'https://js.dump.academy/keksobooking';
  var statusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  function defaultRequest(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS; // 10s

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  }

  window.load = function (onLoad, onError) {
    var xhr = defaultRequest(onLoad, onError);
    xhr.open('GET', URL);
    xhr.send();
  };

  window.save = function (data, onLoad, onError) {
    var xhr = defaultRequest(onLoad, onError);
    xhr.open('POST', URL_SAVE);
    xhr.send(data);
  };
})();
