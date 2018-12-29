'use strict';

(function () {
  var ZoomClass = {
    ZOOM_IN: '.scale__control--bigger',
    ZOOM_OUT: '.scale__control--smaller',
    VALUE: '.scale__control--value'
  };

  var ZOOM_STEP = 25;

  var zoomInButtonElement = document.querySelector(ZoomClass.ZOOM_IN);
  var zoomOutButtonElement = document.querySelector(ZoomClass.ZOOM_OUT);
  var zoomValueElement = document.querySelector(ZoomClass.VALUE);

  var currentZoomLevel = document.querySelector(ZoomClass.VALUE).value;
  currentZoomLevel = parseInt(currentZoomLevel.substr(0, currentZoomLevel.length - 1), 10);
  currentZoomLevel = currentZoomLevel > 100 ? 100 : currentZoomLevel;
  currentZoomLevel = currentZoomLevel < 0 ? 0 : currentZoomLevel;

  var increaseZoom = function () {
    currentZoomLevel += ZOOM_STEP;
    currentZoomLevel = currentZoomLevel > 100 ? 100 : currentZoomLevel;
  };

  var decreaseZoom = function () {
    currentZoomLevel -= ZOOM_STEP;
    currentZoomLevel = currentZoomLevel < 0 ? 0 : currentZoomLevel;
  };

  var generateZoomPropertyValue = function () {
    return ('scale(' + currentZoomLevel / 100 + ')');
  };

  var applyZoom = function () {
    zoomValueElement.value = currentZoomLevel + '%';
    window.uploadPhoto.uploadPreviewImageElement.style.transform = generateZoomPropertyValue();
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
})();
