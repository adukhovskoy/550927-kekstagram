'use strict';

(function () {
  var PICTURE_CLASS = '.picture';
  var PICTURE_IMG_CLASS = '.picture__img';
  var PICTURE_LIKES_CLASS = '.picture__likes';
  var PICTURE_COMMENTS_CLASS = '.picture__comments';
  var PICTURE_TEMPLATE_ID = '#picture';

  var template = document.querySelector(PICTURE_TEMPLATE_ID).content.querySelector(PICTURE_CLASS);

  var generatePictureElement = function (picture) {
    var element = template.cloneNode(true);
    element.querySelector(PICTURE_IMG_CLASS).src = picture.url;
    element.querySelector(PICTURE_LIKES_CLASS).textContent = picture.likes;
    element.querySelector(PICTURE_COMMENTS_CLASS).textContent = picture.comments.length;

    element.addEventListener('click', function () {
      window.pictureDetails.initBigPicture(picture);
    });
    return (element);
  };

  window.picture = {
    generateElement: generatePictureElement,
    CLASS: PICTURE_CLASS
  };
})();
