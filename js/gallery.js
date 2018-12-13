'use strict';
void function () {
  var TEMPLATE_ID = 'picture';
  var GALLERY_CLASS = 'pictures';

  var generateGallery = function (templateID, pictures) {
    var fragment = document.createDocumentFragment();
    pictures.forEach(function (picture) {
      var galleryElement = window.picture.generatePictureElement(templateID, picture);
      fragment.appendChild(galleryElement);
    });
    return (fragment);
  };

  var insertGalleryElement = function (pictures) {
    var galleryElement = document.querySelector('.' + GALLERY_CLASS);
    galleryElement.appendChild(generateGallery(TEMPLATE_ID, pictures));
  };

  window.data.load('https://js.dump.academy/kekstagram/data', insertGalleryElement);

  window.util.hideElement('.social__comment-count');
  window.util.hideElement('.comments-loader');

  window.gallery = {
    templateID: TEMPLATE_ID,
    galleryClass: GALLERY_CLASS
  };
}();
