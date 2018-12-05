'use strict';

var ENTER_KEYCODE = 13;
var ESCAPE_KEYCODE = 27;

var showElement = function (selector) {
  var element = document.querySelector(selector);
  element.classList.toggle('hidden', false);
  element.classList.toggle('visually-hidden', false);
};

var hideElement = function (selector) {
  var element = document.querySelector(selector);
  element.classList.toggle('visually-hidden', true);
};

var onUploadOverlayEscKeydown = function (evt) {
  if (evt.keyCode === ESCAPE_KEYCODE) {
    hideUploadOverlay();
  }
};

var showUploadOverlay = function () {
  showElement('.img-upload__overlay');
  document.addEventListener('keydown', onUploadOverlayEscKeydown);
};

var hideUploadOverlay = function () {
  hideElement('.img-upload__overlay');
  document.querySelector('.img-upload__form').reset();
  document.removeEventListener('keydown', onUploadOverlayEscKeydown);
};

var hideEffectSlider = function () {
  hideElement('.img-upload__effect-level');
};

var showEffectSlider = function () {
  showElement('.img-upload__effect-level');
};

var calculateEffectLevelPercent = function () {
  var rangeWidth = document.querySelector('.effect-level__line').offsetWidth;
  var rangeValue = document.querySelector('.effect-level__pin').offsetLeft;
  return Math.round(100 / rangeWidth * rangeValue) / 100;
};

var resetImageFilters = function (preview, image) {
  image.classList.remove('effects__preview--chrome');
  image.classList.remove('effects__preview--sepia');
  image.classList.remove('effects__preview--marvin');
  image.classList.remove('effects__preview--phobos');
  image.classList.remove('effects__preview--heat');
  preview.style.removeProperty('filter');
  document.querySelector('.effect-level__value').value = 100;
};

var generateFilterPropertyValue = function (filterClassName, effectLevelPercent) {
  switch (filterClassName) {
    case 'effects__preview--chrome':
      return 'grayscale(' + effectLevelPercent + ')';
    case 'effects__preview--sepia':
      return 'sepia(' + effectLevelPercent + ')';
    case 'effects__preview--marvin':
      return 'invert(' + effectLevelPercent * 100 + '%)';
    case 'effects__preview--phobos':
      return 'blur(' + Math.round(effectLevelPercent * 3) + 'px)';
    case 'effects__preview--heat':
      return 'brightness(' + Math.round(effectLevelPercent * 3) + ')';
    default:
      return null;
  }
};

var applyImageFilterPreview = function (filterClassName) {
  var imageUploadPreview = document.querySelector('.img-upload__preview');
  var imageUploadPreviewImage = imageUploadPreview.querySelector('img');
  resetImageFilters(imageUploadPreview, imageUploadPreviewImage);
  var filterPropertyValue = generateFilterPropertyValue(filterClassName, calculateEffectLevelPercent());
  if (filterPropertyValue) {
    imageUploadPreview.style.filter = filterPropertyValue;
  }
};

document.querySelector('#upload-file').addEventListener('change', showUploadOverlay);

document.querySelector('.img-upload__cancel').addEventListener('click', hideUploadOverlay);

document.querySelector('.img-upload__cancel').addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    hideUploadOverlay();
  }
});

document.querySelector('.effect-level__pin').addEventListener('mouseup', function () {
  document.querySelector('.effect-level__value').value = calculateEffectLevelPercent();
});

document.querySelector('#effect-none').addEventListener('click', function () {
  hideEffectSlider();
  applyImageFilterPreview('effects__preview--none');
});

document.querySelector('#effect-chrome').addEventListener('click', function () {
  showEffectSlider();
  applyImageFilterPreview('effects__preview--chrome');
});

document.querySelector('#effect-sepia').addEventListener('click', function () {
  showEffectSlider();
  applyImageFilterPreview('effects__preview--sepia');
});

document.querySelector('#effect-marvin').addEventListener('click', function () {
  showEffectSlider();
  applyImageFilterPreview('effects__preview--marvin');
});

document.querySelector('#effect-phobos').addEventListener('click', function () {
  showEffectSlider();
  applyImageFilterPreview('effects__preview--phobos');
});

document.querySelector('#effect-heat').addEventListener('click', function () {
  showEffectSlider();
  applyImageFilterPreview('effects__preview--heat');
});
