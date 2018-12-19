'use strict';

(function () {
  var MAX_TAGS_COUNT = 5;
  var TAG_PREFIX = '#';
  var MAX_TAG_LENGTH = 20;
  var ValidityText = {
    sameTags: 'Один и тот же хэш-тег не может быть использован дважды',
    incorrectPrefix: 'Хэш-тег должен начинаться с символа # (решётка)',
    onlyPrefix: 'Хеш-тег не может состоять только из одной решётки',
    tooManyTags: 'Нельзя указать больше пяти хэш-тегов',
    tooLongTag: 'Максимальная длина одного хэш-тега 20 символов, включая решётку'
  };

  window.uploadPhoto.hashTagsInput.addEventListener('input', function (evt) {
    var hashTags = evt.target.value.toLowerCase().split(' ').sort();
    if (hashTags.length > MAX_TAGS_COUNT) {
      window.uploadPhoto.hashTagsInput.setCustomValidity(ValidityText.tooManyTags);
    } else {
      for (var i = 0; i < hashTags.length; i++) {
        var isDuplicateComments = false;
        if (hashTags[i] === hashTags[i - 1]) {
          window.uploadPhoto.hashTagsInput.setCustomValidity(ValidityText.sameTags);
          isDuplicateComments = true;
        } else if (!isDuplicateComments) {
          var hashTag = hashTags[i];
          if (hashTag[0] !== TAG_PREFIX && hashTags[0] !== '') {
            window.uploadPhoto.hashTagsInput.setCustomValidity(ValidityText.incorrectPrefix);
          } else if (hashTag === TAG_PREFIX) {
            window.uploadPhoto.hashTagsInput.setCustomValidity(ValidityText.onlyPrefix);
          } else if (hashTag.length > MAX_TAG_LENGTH) {
            window.uploadPhoto.hashTagsInput.setCustomValidity(ValidityText.tooLongTag);
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
