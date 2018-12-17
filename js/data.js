'use strict';
void function () {

  var load = function (url, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });
    xhr.open('GET', url);
    xhr.send();
  };

  window.data = {
    load: load
  };
}();
