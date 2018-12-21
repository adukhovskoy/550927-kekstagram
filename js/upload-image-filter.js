'use strict';

(function () {
  var EffectSliderClass = {
    SLIDER: '.img-upload__effect-level',
    PIN: '.effect-level__pin',
    LINE: '.effect-level__line',
    DEPTH: '.effect-level__depth',
    VALUE: '.effect-level__value'
  };

  var EffectPreviewClass = {
    CHROME: 'effects__preview--chrome',
    SEPIA: 'effects__preview--sepia',
    MARVIN: 'effects__preview--marvin',
    PHOBOS: 'effects__preview--phobos',
    HEAT: 'effects__preview--heat',
  };

  var EFFECTS_LIST_CLASS = '.effects__list';
  var effectLevelPin = document.querySelector(EffectSliderClass.PIN);
  var effectLevelLine = document.querySelector(EffectSliderClass.LINE);
  var effectLevelDepth = document.querySelector(EffectSliderClass.DEPTH);
  var imageUploadPreview = document.querySelector('.img-upload__preview');
  var imageUploadPreviewImage = imageUploadPreview.querySelector('img');

  var hideEffectSlider = function () {
    window.util.hideElement(EffectSliderClass.SLIDER);
  };

  var showEffectSlider = function () {
    window.util.showElement(EffectSliderClass.SLIDER);
  };

  var calculateEffectLevelPercent = function () {
    var rangeWidth = effectLevelLine.offsetWidth;
    var rangeValue = effectLevelPin.offsetLeft;
    return Math.round(100 / rangeWidth * rangeValue) / 100;
  };

  var resetImageFilters = function (preview, image) {
    image.classList.remove(EffectPreviewClass.CHROME, EffectPreviewClass.SEPIA, EffectPreviewClass.MARVIN, EffectPreviewClass.PHOBOS, EffectPreviewClass.HEAT);
    preview.style.removeProperty('filter');
    document.querySelector(EffectSliderClass.VALUE).value = 100;
  };

  var generateFilterPropertyValue = function (filterClassName, effectLevelPercent) {
    switch (filterClassName) {
      case EffectPreviewClass.CHROME:
        return 'grayscale(' + effectLevelPercent + ')';
      case EffectPreviewClass.SEPIA:
        return 'sepia(' + effectLevelPercent + ')';
      case EffectPreviewClass.MARVIN:
        return 'invert(' + effectLevelPercent * 100 + '%)';
      case EffectPreviewClass.PHOBOS:
        return 'blur(' + Math.round(effectLevelPercent * 3) + 'px)';
      case EffectPreviewClass.HEAT:
        return 'brightness(' + Math.round(effectLevelPercent * 3) + ')';
      default:
        return null;
    }
  };

  var applyImageFilterPreview = function (filterClassName) {
    resetImageFilters(imageUploadPreview, imageUploadPreviewImage);
    var filterPropertyValue = generateFilterPropertyValue(filterClassName, calculateEffectLevelPercent());
    if (filterPropertyValue) {
      imageUploadPreview.style.filter = filterPropertyValue;
    }
  };

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startX = evt.clientX;
    var overflowLeft = 0;
    var overflowRight = 0;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shiftX = moveEvt.clientX - startX;
      startX = moveEvt.clientX;
      if ((overflowLeft >= 0) && (overflowRight <= 0)) {
        effectLevelPin.style.left = (effectLevelPin.offsetLeft + shiftX) + 'px';
        effectLevelDepth.style.width = (effectLevelPin.offsetLeft + shiftX) + 'px';
      }
      if (effectLevelPin.offsetLeft < 0) {
        effectLevelPin.style.left = 0 + 'px';
        effectLevelDepth.style.width = 0 + 'px';
      } else if (effectLevelPin.offsetLeft > effectLevelLine.offsetWidth) {
        effectLevelPin.style.left = effectLevelLine.offsetWidth + 'px';
        effectLevelDepth.style.width = effectLevelLine.offsetWidth + 'px';
      }

      if (effectLevelPin.offsetLeft === 0) {
        overflowLeft += shiftX;
      } else if (parseInt(effectLevelPin.style.left, 10) === parseInt(effectLevelLine.offsetWidth, 10)) {
        overflowRight += shiftX;
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      var selectedFilterName = document.querySelector('input[name="effect"]:checked').value;
      applyImageFilterPreview('effects__preview--' + selectedFilterName);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.querySelector(EffectSliderClass.VALUE).value = calculateEffectLevelPercent();
  });

  document.querySelector(EFFECTS_LIST_CLASS).addEventListener('click', function (evt) {
    if (evt.target.name === 'effect') {
      showEffectSlider();
      effectLevelPin.style.left = effectLevelLine.offsetWidth + 'px';
      effectLevelDepth.style.width = effectLevelLine.offsetWidth + 'px';
      var selectedFilterName = document.querySelector('input[name="effect"]:checked').value;
      if (selectedFilterName === 'none') {
        hideEffectSlider();
      }
      applyImageFilterPreview('effects__preview--' + selectedFilterName);
    }
  });

})();
