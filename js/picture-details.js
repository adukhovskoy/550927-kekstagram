'use strict';

(function () {
  var BIG_PICTURE_CLASS = '.big-picture';
  var BIG_PICTURE_LIKES_COUNT_CLASS = '.likes-count';
  var BIG_PICTURE_DESCRIPTION_CLASS = '.social__caption';
  var BIG_PICTURE_COMMENTS_CLASS = '.social__comments';
  var BIG_PICTURE_CANCEL_CLASS = '.big-picture__cancel';
  var COMMENT_LI_CLASS = 'social__comment';
  var COMMENT_AVATAR_CLASS = 'social__picture';
  var COMMENT_TEXT_CLASS = 'social__text';
  var COMMENTS_COUNT_CLASS = '.social__comment-count';
  var COMMENTS_ALL_COUNT_CLASS = '.comments-count';
  var SHOW_MORE_COMMENTS_CLASS = '.comments-loader';
  var COMMENT_BATCH_SIZE = 5;

  var bigPictureCloseButton = document.querySelector(BIG_PICTURE_CANCEL_CLASS);

  var onBigPictureEscKeydown = function (evt) {
    if (window.util.isEscEvent(evt)) {
      hideBigPicture();
    }
  };

  var showBigPicture = function () {
    window.util.showElement(BIG_PICTURE_CLASS);
    document.addEventListener('keydown', onBigPictureEscKeydown);
  };

  var hideBigPicture = function () {
    window.util.hideElement(BIG_PICTURE_CLASS);
    document.removeEventListener('keydown', onBigPictureEscKeydown);
  };

  var generateCommentElement = function (comment) {
    var li = document.createElement('li');
    li.className = COMMENT_LI_CLASS;

    var img = document.createElement('img');
    img.className = COMMENT_AVATAR_CLASS;
    img.src = comment.avatar;
    img.alt = 'Аватар комментатора фотографии';
    img.width = '35';
    img.height = '35';

    var p = document.createElement('p');
    p.className = COMMENT_TEXT_CLASS;
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

  var initBigPicture = function (picture) {
    var commentsBatchCount = 0;
    var shownCommentCount = 0;
    var bigPicture = document.querySelector(BIG_PICTURE_CLASS);

    var onShowMoreCommentsClick = function () {
      var commentsCount = bigPicture.querySelector(COMMENTS_COUNT_CLASS);

      var getCommentsBatch = function () {
        var start = commentsBatchCount * COMMENT_BATCH_SIZE;
        var end = ++commentsBatchCount * COMMENT_BATCH_SIZE;
        var commentsBatch = picture.comments.slice(start, end);
        shownCommentCount += commentsBatch.length;
        return commentsBatch;
      };

      socialComments.appendChild(generateCommentElements(getCommentsBatch()));
      var commentsCountValue = shownCommentCount < picture.comments.length ? shownCommentCount : picture.comments.length;
      commentsCount.innerHTML = commentsCountValue + ' из <span class="' + COMMENTS_ALL_COUNT_CLASS.slice(1) + '">' + picture.comments.length + '</span > комментариев';
    };

    bigPicture.querySelector(BIG_PICTURE_CLASS + '__img' + ' > img').src = picture.url;
    bigPicture.querySelector(BIG_PICTURE_LIKES_COUNT_CLASS).textContent = picture.likes;
    bigPicture.querySelector(BIG_PICTURE_DESCRIPTION_CLASS).textContent = picture.description;
    var socialComments = bigPicture.querySelector(BIG_PICTURE_COMMENTS_CLASS);
    while (socialComments.firstChild) {
      socialComments.removeChild(socialComments.firstChild);
    }
    onShowMoreCommentsClick();
    bigPicture.querySelector(SHOW_MORE_COMMENTS_CLASS).addEventListener('click', onShowMoreCommentsClick);
    showBigPicture();
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
    initBigPicture: initBigPicture
  };
})();
