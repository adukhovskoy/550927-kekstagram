'use strict';
void function () {

  var GET_URL = 'https://js.dump.academy/kekstagram/data';
  var POST_URL = 'https://js.dump.academy/kekstagram';

  var initAsyncConnection = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    return (xhr);
  };

  var download = function (onLoad, onError) {
    var xhr = initAsyncConnection(onLoad, onError);
    xhr.open('GET', GET_URL);
    xhr.send();
  };

  var upload = function (data, onLoad, onError) {
    var xhr = initAsyncConnection(onLoad, onError);
    xhr.open('POST', POST_URL);
    xhr.send(data);
  };

  window.backend = {
    download: download,
    upload: upload
  };
}();
