'use strict';
void function () {
  var generatePictureElement = function (templateID, picture) {
    var template = document.querySelector('#' + templateID).content.querySelector('.picture');
    var element = template.cloneNode(true);
    element.querySelector('.picture__img').src = picture.url;
    element.querySelector('.picture__likes').textContent = picture.likes;
    element.querySelector('.picture__comments').textContent = picture.comments.length;

    element.addEventListener('click', function () {
      window.pictureDetails.fillBigPicture(window.pictureDetails.pictureDetailsClass, picture);
      window.pictureDetails.showBigPicture();
    });

    element.addEventListener('keydown', function (evt) {
      if (window.util.isEnterEvent(evt)) {
        window.pictureDetails.fillBigPicture(window.pictureDetails.pictureDetailsClass, picture);
        window.pictureDetails.showBigPicture();
      }
    });
    return (element);
  };

  window.picture = {
    generatePictureElement: generatePictureElement
  };
}();
