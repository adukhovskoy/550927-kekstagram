'use strict';

(function () {

  var initSlider = function (effectSliderClass, callback) {
    var effectLevelPin = document.querySelector(effectSliderClass.PIN);
    var effectLevelLine = document.querySelector(effectSliderClass.LINE);
    var effectLevelDepth = document.querySelector(effectSliderClass.DEPTH);

    effectLevelPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var startX = evt.clientX;
      var overflowLeft = 0;
      var overflowRight = 0;
      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        var shiftX = moveEvt.clientX - startX;
        startX = moveEvt.clientX;
        // Если не вылезли за границы слайдер - зову cb по пропорции, передвигаю полоску и пин
        if ((overflowLeft >= 0) && (overflowRight <= 0)) {
          effectLevelPin.style.left = (effectLevelPin.offsetLeft + shiftX) + 'px';
          effectLevelDepth.style.width = (effectLevelPin.offsetLeft + shiftX) + 'px';
          var effectLevelPercent = Math.round(100 / effectLevelLine.offsetWidth * effectLevelPin.offsetLeft) / 100;
          // Обрезаю вываливание за границы, бывает если резко двигать курсор за край
          effectLevelPercent = effectLevelPercent < 0 ? 0 : effectLevelPercent;
          effectLevelPercent = effectLevelPercent > 1 ? 1 : effectLevelPercent;
          callback(effectLevelPercent);
        }
        // Если вылез слева / справа - обнуляю смещение пина и полоски на левый / правый край
        if (effectLevelPin.offsetLeft < 0) {
          effectLevelPin.style.left = 0 + 'px';
          effectLevelDepth.style.width = 0 + 'px';
        } else if (effectLevelPin.offsetLeft > effectLevelLine.offsetWidth) {
          effectLevelPin.style.left = effectLevelLine.offsetWidth + 'px';
          effectLevelDepth.style.width = effectLevelLine.offsetWidth + 'px';
        }
        // Если вылез слева / справа - коплю overflow
        // В целом такое себе решение с overflow, копится ошибка при резком перемещенииза край, курсор уползает от пина, как победить - хз
        if (effectLevelPin.offsetLeft === 0) {
          overflowLeft += shiftX;
        } else if (parseInt(effectLevelPin.style.left, 10) === parseInt(effectLevelLine.offsetWidth, 10)) {
          overflowRight += shiftX;
        }
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  var setSlider = function (effectSliderClass, callback, percent) {
    var effectLevelPin = document.querySelector(effectSliderClass.PIN);
    var effectLevelLine = document.querySelector(effectSliderClass.LINE);
    var effectLevelDepth = document.querySelector(effectSliderClass.DEPTH);
    effectLevelPin.style.left = effectLevelLine.offsetWidth * percent + 'px';
    effectLevelDepth.style.width = effectLevelLine.offsetWidth * percent + 'px';
    callback(percent);
  };

  window.slider = {
    initSlider: initSlider,
    setSlider: setSlider
  };
})();
