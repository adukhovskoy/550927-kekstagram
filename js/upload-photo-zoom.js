'use strict';

(function () {
  var ZoomClass = {
    ZOOM_IN: '.scale__control--bigger',
    ZOOM_OUT: '.scale__control--smaller',
    VALUE: '.scale__control--value'
  };

  var ZOOM_STEP = 25;
  var ZOOM_MAX = 100;
  var ZOOM_MIN = 25;

  var zoomInButtonElement = document.querySelector(ZoomClass.ZOOM_IN);
  var zoomOutButtonElement = document.querySelector(ZoomClass.ZOOM_OUT);
  var zoomValueElement = document.querySelector(ZoomClass.VALUE);

  var currentZoomLevel = document.querySelector(ZoomClass.VALUE).value;
  currentZoomLevel = parseInt(currentZoomLevel.substr(0, currentZoomLevel.length - 1), 10);
  var defaultZoomLevel = currentZoomLevel;
  currentZoomLevel = currentZoomLevel > ZOOM_MAX ? ZOOM_MAX : currentZoomLevel;
  currentZoomLevel = currentZoomLevel < ZOOM_MIN ? ZOOM_MIN : currentZoomLevel;

  var increaseZoom = function () {
    currentZoomLevel += ZOOM_STEP;
    currentZoomLevel = currentZoomLevel > ZOOM_MAX ? ZOOM_MAX : currentZoomLevel;
  };

  var decreaseZoom = function () {
    currentZoomLevel -= ZOOM_STEP;
    currentZoomLevel = currentZoomLevel < ZOOM_MIN ? ZOOM_MIN : currentZoomLevel;
  };

  var generateZoomPropertyValue = function () {
    return ('scale(' + currentZoomLevel / 100 + ')');
  };

  var applyZoom = function () {
    zoomValueElement.value = currentZoomLevel + '%';
    window.uploadPhotoFilter.previewImageElement.style.transform = generateZoomPropertyValue();
  };

  var resetZoom = function () {
    currentZoomLevel = defaultZoomLevel;
    applyZoom();
  };

  var zoomHandler = function (callback) {
    return function () {
      callback();
      applyZoom();
    };
  };

  var onZoomInButtonClick = zoomHandler(increaseZoom);
  var onZoomOutButtonClick = zoomHandler(decreaseZoom);

  applyZoom();
  zoomInButtonElement.addEventListener('click', onZoomInButtonClick);
  zoomOutButtonElement.addEventListener('click', onZoomOutButtonClick);

  window.uploadPhotoZoom = {
    reset: resetZoom
  };
})();
