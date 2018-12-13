'use strict';

void function () {
  var BIG_PICTURE_CLASS = 'big-picture';
  var BIG_PICTURE_CANCEL_CLASS = '.big-picture__cancel';

  var bigPictureCloseButton = document.querySelector(BIG_PICTURE_CANCEL_CLASS);

  var onBigPictureEscKeydown = function (evt) {
    if (window.util.isEscEvent(evt)) {
      hideBigPicture();
    }
  };

  var showBigPicture = function () {
    window.util.showElement('.' + BIG_PICTURE_CLASS);
    document.addEventListener('keydown', onBigPictureEscKeydown);
  };

  var hideBigPicture = function () {
    window.util.hideElement('.' + BIG_PICTURE_CLASS);
    document.removeEventListener('keydown', onBigPictureEscKeydown);
  };

  var generateCommentElement = function (comment) {
    var li = document.createElement('li');
    li.className = 'social__comment';

    var img = document.createElement('img');
    img.className = 'social__picture';
    img.src = comment.avatar;
    img.alt = 'Аватар комментатора фотографии';
    img.width = '35';
    img.height = '35';

    var p = document.createElement('p');
    p.className = 'social__text';
    p.textContent = comment.message;

    li.appendChild(img);
    li.appendChild(p);
    return (li);
  };

  var generateCommentElements = function (comments) {
    var fragment = document.createDocumentFragment();
    comments.forEach(function (comment) {
      var generatedCommentElement = generateCommentElement(comment);
      fragment.appendChild(generatedCommentElement);
    });
    return (fragment);
  };

  var fillBigPicture = function (bigPictureClass, picture) {
    var bigPicture = document.querySelector('.' + bigPictureClass);
    bigPicture.querySelector('.' + bigPictureClass + '__img' + ' > img').src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
    bigPicture.querySelector('.social__caption').textContent = picture.description;
    var socialComments = bigPicture.querySelector('.social__comments');
    while (socialComments.firstChild) {
      socialComments.removeChild(socialComments.firstChild);
    }
    socialComments.appendChild(generateCommentElements(picture.comments));
  };

  bigPictureCloseButton.addEventListener('click', function () {
    hideBigPicture();
  });

  bigPictureCloseButton.addEventListener('keydown', function (evt) {
    if (window.util.isEscEvent(evt)) {
      hideBigPicture();
    }
  });

  window.pictureDetails = {
    showBigPicture: showBigPicture,
    fillBigPicture: fillBigPicture,
    pictureDetailsClass: BIG_PICTURE_CLASS
  };
}();
