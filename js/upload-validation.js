'use strict';

(function () {
  var MAX_TAGS_COUNT = 5;
  var TAG_PREFIX = '#';
  var MAX_TAG_LENGTH = 20;
  var ValidityText = {
    SAME_TAGS: 'Один и тот же хэш-тег не может быть использован дважды',
    INCORRECT_PREFIX: 'Хэш-тег должен начинаться с символа # (решётка)',
    ONLY_PREFIX: 'Хеш-тег не может состоять только из одной решётки',
    INCORRECT_DELIMETER: 'Хэш-теги разделяются пробелами',
    TOO_MANY_TAGS: 'Нельзя указать больше пяти хэш-тегов',
    TOO_LONG_TAG: 'Максимальная длина одного хэш-тега 20 символов, включая решётку'
  };

  var checkDuplicateTagPrefix = function (string) {
    for (var i = 0; i < string.length; i++) {
      if (string[i] === TAG_PREFIX && i !== 0) {
        return true;
      }
    }
    return false;
  };

  var checkIsEmptyElements = function (element) {
    return (element !== '');
  };

  var paintHashTagsInput = function () {
    if (!window.uploadPhoto.hashTagsInput.checkValidity()) {
      window.uploadPhoto.hashTagsInput.style.borderColor = 'red';
    } else {
      window.uploadPhoto.hashTagsInput.style.borderColor = 'initial';
    }
  };

  var validateHashTagsInput = function (evt) {
    var hashTags = evt.target.value.toLowerCase().split(' ').sort().filter(checkIsEmptyElements);
    if (hashTags.length > MAX_TAGS_COUNT) {
      window.uploadPhoto.hashTagsInput.setCustomValidity(ValidityText.TOO_MANY_TAGS);
      return false;
    } else {
      for (var i = 0; i < hashTags.length; i++) {
        if (hashTags.length > 1 && i > 1 && hashTags[i] === hashTags[i - 1]) {
          window.uploadPhoto.hashTagsInput.setCustomValidity(ValidityText.SAME_TAGS);
          return false;
        } else if (hashTags[i] === TAG_PREFIX) {
          window.uploadPhoto.hashTagsInput.setCustomValidity(ValidityText.ONLY_PREFIX);
          return false;
        } else if (hashTags[i][0] !== TAG_PREFIX) {
          window.uploadPhoto.hashTagsInput.setCustomValidity(ValidityText.INCORRECT_PREFIX);
          return false;
        } else if (hashTags[i].length > MAX_TAG_LENGTH) {
          window.uploadPhoto.hashTagsInput.setCustomValidity(ValidityText.TOO_LONG_TAG);
          return false;
        } else if (checkDuplicateTagPrefix(hashTags[i])) {
          window.uploadPhoto.hashTagsInput.setCustomValidity(ValidityText.INCORRECT_DELIMETER);
          return false;
        }
      }
    }
    window.uploadPhoto.hashTagsInput.setCustomValidity('');
    return true;
  };

  var onHashTagsInput = function (evt) {
    validateHashTagsInput(evt);
    paintHashTagsInput();
  };

  window.uploadPhoto.hashTagsInput.addEventListener('input', onHashTagsInput);
})();
