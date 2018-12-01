'use strict';

// Возможно чтоило что-то вынести в константы (имена классов например)
// Возможно стоит где-то избавиться от document.querySelector и вызвать на уже найденном объекте а не на документе целиком

// npm test не даёт общие куски вынести в отдельный JS и подключить в html первым файлом, приходится дублировать
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

// Стоит ли делать такие фнкции на каждый чих, или достаточно простого hideElement?
var showUploadOverlay = function () {
  showElement('.img-upload__overlay');
};

var hideUploadOverlay = function () {
  hideElement('.img-upload__overlay');
  document.querySelector('.img-upload__form').reset();
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
  var filterPropertyValue = null;
  if (filterClassName === 'effects__preview--chrome') {
    filterPropertyValue = 'grayscale(' + effectLevelPercent + ')';
  } else if (filterClassName === 'effects__preview--sepia') {
    filterPropertyValue = 'sepia(' + effectLevelPercent + ')';
  } else if (filterClassName === 'effects__preview--marvin') {
    filterPropertyValue = 'invert(' + effectLevelPercent * 100 + '%)';
  } else if (filterClassName === 'effects__preview--phobos') {
    filterPropertyValue = 'blur(' + Math.round(effectLevelPercent * 3) + 'px)';
  } else if (filterClassName === 'effects__preview--sepia') {
    filterPropertyValue = 'brightness(' + Math.round(effectLevelPercent * 3) + ')';
  }
  return filterPropertyValue;
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

document.querySelector('#upload-file').addEventListener('change', function () {
  showUploadOverlay();
});

document.querySelector('.img-upload__cancel').addEventListener('click', function () {
  hideUploadOverlay();
});

document.querySelector('.img-upload__cancel').addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    hideUploadOverlay();
  }
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESCAPE_KEYCODE) {
    hideUploadOverlay();
  }
});

document.querySelector('.effect-level__pin').addEventListener('mouseup', function () {
  document.querySelector('.effect-level__value').value = calculateEffectLevelPercent();
});

// Вызывает сомнения ручное добавление лисенеров на каждую педаль да ещё и два раза - для клика и ентера
// Вызывают сомнения харкоженные параметры в вызове applyImageFilterPreview
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

document.querySelector('#effect-none').addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    hideEffectSlider();
    applyImageFilterPreview('effects__preview--none');
  }
});

document.querySelector('#effect-chrome').addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    showEffectSlider();
    applyImageFilterPreview('effects__preview--chrome');
  }
});

document.querySelector('#effect-sepia').addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    showEffectSlider();
    applyImageFilterPreview('effects__preview--sepia');
  }
});

document.querySelector('#effect-marvin').addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    showEffectSlider();
    applyImageFilterPreview('effects__preview--marvin');
  }
});

document.querySelector('#effect-phobos').addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    showEffectSlider();
    applyImageFilterPreview('effects__preview--phobos');
  }
});

document.querySelector('#effect-heat').addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    showEffectSlider();
    applyImageFilterPreview('effects__preview--heat');
  }
});

