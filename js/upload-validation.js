'use strict';

(function () {
  var MAX_TAGS_COUNT = 5;
  var TAG_PREFIX = '#';
  var MAX_TAG_LENGTH = 20;
  var ValidityText = {
    SAME_TAGS: 'Один и тот же хэш-тег не может быть использован дважды',
    INCORRECT_PREFIX: 'Хэш-тег должен начинаться с символа # (решётка)',
    ONLY_PREFIX: 'Хеш-тег не может состоять только из одной решётки',
    TOO_MANY_TAGS: 'Нельзя указать больше пяти хэш-тегов',
    TOO_LONG_TAG: 'Максимальная длина одного хэш-тега 20 символов, включая решётку'
  };

  window.uploadPhoto.hashTagsInput.addEventListener('input', function (evt) {
    var hashTags = evt.target.value.toLowerCase().split(' ').sort();
    if (hashTags.length > MAX_TAGS_COUNT) {
      window.uploadPhoto.hashTagsInput.setCustomValidity(ValidityText.TOO_MANY_TAGS);
    } else {
      for (var i = 0; i < hashTags.length; i++) {
        var isDuplicateComments = false;
        if (hashTags[i] === hashTags[i - 1]) {
          window.uploadPhoto.hashTagsInput.setCustomValidity(ValidityText.SAME_TAGS);
          isDuplicateComments = true;
        } else if (!isDuplicateComments) {
          var hashTag = hashTags[i];
          if (hashTag[0] !== TAG_PREFIX && hashTags[0] !== '') {
            window.uploadPhoto.hashTagsInput.setCustomValidity(ValidityText.INCORRECT_PREFIX);
          } else if (hashTag === TAG_PREFIX) {
            window.uploadPhoto.hashTagsInput.setCustomValidity(ValidityText.ONLY_PREFIX);
          } else if (hashTag.length > MAX_TAG_LENGTH) {
            window.uploadPhoto.hashTagsInput.setCustomValidity(ValidityText.TOO_LONG_TAG);
          } else {
            window.uploadPhoto.hashTagsInput.setCustomValidity('');
          }
        }
      }
    }
    if (!window.uploadPhoto.hashTagsInput.checkValidity()) {
      window.uploadPhoto.hashTagsInput.style.borderColor = 'red';
    } else {
      window.uploadPhoto.hashTagsInput.style.borderColor = 'initial';
    }
  });
})();
