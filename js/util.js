'use strict';
void function () {
  var Keycode = {
    ESC: 27,
    ENTER: 13,
    NUMPAD_ENTER: 176
  };

  var isEscEvent = function (evt) {
    return evt.keyCode === Keycode['ESC'];
  };

  var isEnterEvent = function (evt) {
    return (evt.keyCode === Keycode['ENTER']) || (evt.keyCode === Keycode['NUMPAD_ENTER']);
  };

  var showElement = function (selector) {
    var element = document.querySelector(selector);
    element.classList.toggle('hidden', false);
    element.classList.toggle('visually-hidden', false);
  };

  var hideElement = function (selector) {
    var element = document.querySelector(selector);
    element.classList.toggle('visually-hidden', true);
  };

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    showElement: showElement,
    hideElement: hideElement
  };
}();
