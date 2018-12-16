'use strict';

(function () {
  var EffectSliderClass = {
    slider: 'img-upload__effect-level',
    pin: 'effect-level__pin',
    line: 'effect-level__line',
    depth: 'effect-level__depth',
    value: 'effect-level__value'
  };
  var EffectPreviewClass = {
    chrome: 'effects__preview--chrome',
    sepia: 'effects__preview--sepia',
    marvin: 'effects__preview--marvin',
    phobos: 'effects__preview--phobos',
    heat: 'effects__preview--heat',
  };
  var EFFECTS_LIST_CLASS = 'effects__list';
  var UPLOAD_BUTTON_ID = 'upload-file';
  var UPLOAD_CANCEL_BUTTON_CLASS = 'img-upload__cancel';
  var UPLOAD_OVERLAY_CLASS = 'img-upload__overlay';
  var UPLOAD_FORM_CLASS = 'img-upload__form';

  var effectLevelPin = document.querySelector('.' + EffectSliderClass.pin);
  var effectLevelLine = document.querySelector('.' + EffectSliderClass.line);
  var effectLevelDepth = document.querySelector('.' + EffectSliderClass.depth);
  var imageUploadPreview = document.querySelector('.img-upload__preview');
  var imageUploadPreviewImage = imageUploadPreview.querySelector('img');
  var hashTagsInput = document.querySelector('.text__hashtags');
  var commentInput = document.querySelector('.text__description');

  hashTagsInput.addEventListener('keydown', function (evt) {
    if (window.util.isEscEvent(evt)) {
      evt.stopPropagation();
    }
  });

  commentInput.addEventListener('keydown', function (evt) {
    if (window.util.isEscEvent(evt)) {
      evt.stopPropagation();
    }
  });

  var onUploadOverlayEscKeydown = function (evt) {
    if (window.util.isEscEvent(evt)) {
      hideUploadOverlay();
    }
  };

  var showUploadOverlay = function () {
    window.util.showElement('.' + UPLOAD_OVERLAY_CLASS);
    document.addEventListener('keydown', onUploadOverlayEscKeydown);
  };

  var hideUploadOverlay = function () {
    window.util.hideElement('.' + UPLOAD_OVERLAY_CLASS);
    document.querySelector('.' + UPLOAD_FORM_CLASS).reset();
    document.removeEventListener('keydown', onUploadOverlayEscKeydown);
  };

  var hideEffectSlider = function () {
    window.util.hideElement('.' + EffectSliderClass.slider);
  };

  var showEffectSlider = function () {
    window.util.showElement('.' + EffectSliderClass.slider);
  };

  var calculateEffectLevelPercent = function () {
    var rangeWidth = effectLevelLine.offsetWidth;
    var rangeValue = effectLevelPin.offsetLeft;
    return Math.round(100 / rangeWidth * rangeValue) / 100;
  };

  var resetImageFilters = function (preview, image) {
    image.classList.remove(EffectPreviewClass.chrome, EffectPreviewClass.sepia, EffectPreviewClass.marvin, EffectPreviewClass.phobos, EffectPreviewClass.phobos, EffectPreviewClass.heat);
    preview.style.removeProperty('filter');
    document.querySelector('.' + EffectSliderClass.value).value = 100;
  };

  var generateFilterPropertyValue = function (filterClassName, effectLevelPercent) {
    switch (filterClassName) {
      case EffectPreviewClass.chrome:
        return 'grayscale(' + effectLevelPercent + ')';
      case EffectPreviewClass.sepia:
        return 'sepia(' + effectLevelPercent + ')';
      case EffectPreviewClass.marvin:
        return 'invert(' + effectLevelPercent * 100 + '%)';
      case EffectPreviewClass.phobos:
        return 'blur(' + Math.round(effectLevelPercent * 3) + 'px)';
      case EffectPreviewClass.heat:
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

  document.querySelector('#' + UPLOAD_BUTTON_ID).addEventListener('change', showUploadOverlay);

  document.querySelector('.' + UPLOAD_CANCEL_BUTTON_CLASS).addEventListener('click', hideUploadOverlay);

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
    document.querySelector('.' + EffectSliderClass.value).value = calculateEffectLevelPercent();
  });

  document.querySelector('.' + EFFECTS_LIST_CLASS).addEventListener('click', function (evt) {
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

  window.uploadPhoto = {
    hashTagsInput: hashTagsInput
  };
})();
