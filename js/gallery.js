'use strict';

(function () {
  var GALLERY_CLASS = '.pictures';
  var SOCIAL_COMMENT_COUNT_CLASS = '.social__comment-count';
  var COMMENTS_LOADER_CLASS = '.comments-loader';

  var generateGallery = function (pictures) {
    var fragment = document.createDocumentFragment();
    pictures.forEach(function (picture) {
      var galleryElement = window.picture.generatePictureElement(picture);
      fragment.appendChild(galleryElement);
    });
    return (fragment);
  };

  var insertGalleryElement = function (pictures) {
    var galleryElement = document.querySelector(GALLERY_CLASS);
    galleryElement.appendChild(generateGallery(pictures));
  };

  window.data.load('https://js.dump.academy/kekstagram/data', insertGalleryElement);

  window.util.hideElement(SOCIAL_COMMENT_COUNT_CLASS);
  window.util.hideElement(COMMENTS_LOADER_CLASS);
})();
