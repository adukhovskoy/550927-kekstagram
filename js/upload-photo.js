'use strict';
void function () {
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var imageUploadPreview = document.querySelector('.img-upload__preview');
  var imageUploadPreviewImage = imageUploadPreview.querySelector('img');

  var onUploadOverlayEscKeydown = function (evt) {
    if (window.util.isEscEvent(evt)) {
      hideUploadOverlay();
    }
  };

  var showUploadOverlay = function () {
    window.util.showElement('.img-upload__overlay');
    document.addEventListener('keydown', onUploadOverlayEscKeydown);
  };

  var hideUploadOverlay = function () {
    window.util.hideElement('.img-upload__overlay');
    document.querySelector('.img-upload__form').reset();
    document.removeEventListener('keydown', onUploadOverlayEscKeydown);
  };

  var hideEffectSlider = function () {
    window.util.hideElement('.img-upload__effect-level');
  };

  var showEffectSlider = function () {
    window.util.showElement('.img-upload__effect-level');
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
    resetImageFilters(imageUploadPreview, imageUploadPreviewImage);
    var filterPropertyValue = generateFilterPropertyValue(filterClassName, calculateEffectLevelPercent());
    if (filterPropertyValue) {
      imageUploadPreview.style.filter = filterPropertyValue;
    }
  };

  document.querySelector('#upload-file').addEventListener('change', showUploadOverlay);

  document.querySelector('.img-upload__cancel').addEventListener('click', hideUploadOverlay);

  document.querySelector('.img-upload__cancel').addEventListener('keydown', function (evt) {
    if (window.util.isEnterEvent(evt)) {
      hideUploadOverlay();
    }
  });

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
    document.querySelector('.effect-level__value').value = calculateEffectLevelPercent();
  });

  document.querySelector('.effects__list').addEventListener('click', function (evt) {
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

  var hashTagsInput = document.querySelector('.text__hashtags');
  hashTagsInput.addEventListener('input', function (evt) {
    var hashTags = evt.target.value.toLowerCase().split(' ').sort();
    if (hashTags.length > 5) {
      hashTagsInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
    } else {
      for (var i = 0; i < hashTags.length; i++) {
        var isDuplicateComments = false;
        if (hashTags[i] === hashTags[i - 1]) {
          hashTagsInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
          isDuplicateComments = true;
        } else if (!isDuplicateComments) {
          var hashTag = hashTags[i];
          if (hashTag[0] !== '#' && hashTags[0] !== '') {
            hashTagsInput.setCustomValidity('Хэш-тег должен начинаться с символа # (решётка)');
          } else if (hashTag === '#') {
            hashTagsInput.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
          } else if (hashTag.length > 20) {
            hashTagsInput.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
          } else {
            hashTagsInput.setCustomValidity('');
          }
        }
      }
    }
  });

  hashTagsInput.addEventListener('keydown', function (evt) {
    if (window.util.isEscEvent(evt)) {
      evt.stopPropagation();
    }
  });

  var commentInput = document.querySelector('.text__description');
  commentInput.addEventListener('keydown', function (evt) {
    if (window.util.isEscEvent(evt)) {
      evt.stopPropagation();
    }
  });
}();
