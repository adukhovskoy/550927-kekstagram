'use strict';

(function () {
  var EffectSliderClass = {
    SLIDER: '.img-upload__effect-level',
    PIN: '.effect-level__pin',
    LINE: '.effect-level__line',
    DEPTH: '.effect-level__depth',
    VALUE: '.effect-level__value'
  };

  var EffectName = {
    CHROME: 'chrome',
    SEPIA: 'sepia',
    MARVIN: 'marvin',
    PHOBOS: 'phobos',
    HEAT: 'heat',
    NONE: 'none'
  };

  var DEFAULT_FILTER_LEVEL = 1;
  var EFFECT_CLASS_PREFIX = 'effects__preview--';
  var EFFECTS_LIST_CLASS = '.effects__list';
  var effectLevelValue = document.querySelector(EffectSliderClass.VALUE);
  var currentFilterName = EffectName.NONE;

  var hideEffectSlider = function () {
    window.util.hideElement(EffectSliderClass.SLIDER);
  };

  var showEffectSlider = function () {
    window.util.showElement(EffectSliderClass.SLIDER);
  };

  var generateFilterPropertyValue = function (effectLevelPercent) {
    switch (currentFilterName) {
      case EffectName.CHROME:
        return 'grayscale(' + effectLevelPercent + ')';
      case EffectName.SEPIA:
        return 'sepia(' + effectLevelPercent + ')';
      case EffectName.MARVIN:
        return 'invert(' + effectLevelPercent * 100 + '%)';
      case EffectName.PHOBOS:
        return 'blur(' + Math.round(effectLevelPercent * 3) + 'px)';
      case EffectName.HEAT:
        return 'brightness(' + Math.round(effectLevelPercent * 3) + ')';
      default:
        return null;
    }
  };

  var applyFilter = function (effectLevelPercent) {
    var filterPropertyValue = generateFilterPropertyValue(effectLevelPercent);
    window.uploadPhoto.uploadPreviewImageElement.classList.add(EFFECT_CLASS_PREFIX + currentFilterName);
    if (filterPropertyValue) {
      window.uploadPhoto.uploadPreviewImageElement.style.filter = filterPropertyValue;
      effectLevelValue.value = effectLevelPercent * 100;
    }
  };

  var onFilterClick = function (evt) {
    if (evt.target.name === 'effect') {
      var newFilterName = document.querySelector('input[name="effect"]:checked').value;
      if (currentFilterName === 'none' && newFilterName !== 'none') {
        showEffectSlider();
      } else if (currentFilterName !== 'none' && newFilterName === 'none') {
        hideEffectSlider();
      }
      currentFilterName = newFilterName;
      window.uploadPhoto.uploadPreviewImageElement.classList.remove(EFFECT_CLASS_PREFIX + currentFilterName);
      window.slider.setSlider(EffectSliderClass, applyFilter, DEFAULT_FILTER_LEVEL);
    }
  };

  window.slider.initSlider(EffectSliderClass, applyFilter);
  hideEffectSlider();
  document.querySelector(EFFECTS_LIST_CLASS).addEventListener('click', onFilterClick);
})();
