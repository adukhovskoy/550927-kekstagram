'use strict';

var MOCK_PICTURES_COUNT = 25;
var MOCK_LIKES_MIN = 15;
var MOCK_LIKES_MAX = 200;
var COMMENTS_MIN = 0;
var COMMENTS_MAX = 10;
var COMMENTS_SENTENCES_MAX = 2;
var MOCK_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var MOCK_DESCRIPTIONS = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
var TEMPLATE_ID = 'picture';
var PICTURES_CLASS = 'pictures';
var BIG_PICTURE_CLASS = 'big-picture';
var ENTER_KEYCODE = 13;
var ESCAPE_KEYCODE = 27;

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var getRandomIndex = function (array) {
  return getRandomInRange(0, array.length - 1);
};

var showElement = function (selector) {
  var element = document.querySelector(selector);
  element.classList.toggle('hidden', false);
  element.classList.toggle('visually-hidden', false);
};

var hideElement = function (selector) {
  var element = document.querySelector(selector);
  element.classList.toggle('visually-hidden', true);
};

var showBigPicture = function () {
  showElement('.' + BIG_PICTURE_CLASS);
};

var hideBigPicture = function () {
  hideElement('.' + BIG_PICTURE_CLASS);
};

var generateUrl = function (count, usedUrls) {
  do {
    var randomUrl = 'photos/' + getRandomInRange(1, count) + '.jpg';
  } while (usedUrls.indexOf(randomUrl) !== -1);
  usedUrls.push(randomUrl);
  return randomUrl;
};

var generateComments = function (commentsMinCount, commentsMaxCount, commentsSentencesMax, mockComments) {
  var comments = [];
  var commentsCount = getRandomInRange(commentsMinCount, commentsMaxCount);
  for (var j = 1; j <= commentsCount; j++) {
    var comment = '';
    for (var k = 1; k <= getRandomInRange(1, commentsSentencesMax); k++) {
      do {
        var commentString = mockComments[getRandomIndex(mockComments)];
      } while (comment === commentString);
      if (k === 1) {
        comment = commentString;
      } else {
        comment += ' ' + commentString;
      }
    }
    comments.push(comment);
  }
  return comments;
};

var generateMockPictures = function (count, likesMin, likesMax, commentsMinCount, commentsMaxCount, commentsSentencesMax, mockComments, mockDescriptions) {
  var mockPictures = [];
  var usedUrls = [];
  for (var i = 1; i <= count; i++) {
    var randomUrl = generateUrl(count, usedUrls);
    var comments = generateComments(commentsMinCount, commentsMaxCount, commentsSentencesMax, mockComments);
    var description = mockDescriptions[getRandomIndex(mockDescriptions)];
    var likes = getRandomInRange(likesMin, likesMax);
    var mockPicture = {
      url: randomUrl,
      comments: comments,
      description: description,
      likes: likes
    };
    mockPictures.push(mockPicture);
  }
  return mockPictures;
};

var generatePictureElement = function (templateID, picture) {
  var template = document.querySelector('#' + templateID).content.querySelector('.picture');
  var element = template.cloneNode(true);
  element.querySelector('.picture__img').src = picture.url;
  element.querySelector('.picture__likes').textContent = picture.likes;
  element.querySelector('.picture__comments').textContent = picture.comments.length;
  element.addEventListener('click', function () {
    fillBigPicture(BIG_PICTURE_CLASS, picture);
    showBigPicture();
  });
  element.addEventListener('click', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      fillBigPicture(BIG_PICTURE_CLASS, picture);
      showBigPicture();
    }
  });
  return (element);
};

var generatePictureElements = function (templateID, pictures) {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < pictures.length; j++) {
    var generatedPictureElement = generatePictureElement(templateID, pictures[j]);
    fragment.appendChild(generatedPictureElement);
  }
  return (fragment);
};

var generateCommentElement = function (comment) {
  var li = document.createElement('li');
  li.className = 'social__comment';

  var img = document.createElement('img');
  img.className = 'social__picture';
  var randomAvatarUrl = 'img/avatar-' + getRandomInRange(1, 6) + '.svg';
  img.src = randomAvatarUrl;
  img.alt = 'Аватар комментатора фотографии';
  img.width = '35';
  img.height = '35';

  var p = document.createElement('p');
  p.className = 'social__text';
  p.textContent = comment;

  li.appendChild(img);
  li.appendChild(p);
  return (li);
};

var generateCommentElements = function (comments) {
  var fragment = document.createDocumentFragment();
  for (var k = 0; k < comments.length; k++) {
    var generatedCommentElement = generateCommentElement(comments[k]);
    fragment.appendChild(generatedCommentElement);
  }
  return (fragment);
};

var fillBigPicture = function (bigPictureClass, picture) {
  var bigPicture = document.querySelector('.' + bigPictureClass);
  bigPicture.querySelector('.' + bigPictureClass + '__img' + ' > img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  bigPicture.querySelector('.social__comments').appendChild(generateCommentElements(picture.comments));
};

var mockPictures = generateMockPictures(MOCK_PICTURES_COUNT, MOCK_LIKES_MIN, MOCK_LIKES_MAX, COMMENTS_MIN, COMMENTS_MAX, COMMENTS_SENTENCES_MAX, MOCK_COMMENTS, MOCK_DESCRIPTIONS);
document.querySelector('.' + PICTURES_CLASS).appendChild(generatePictureElements(TEMPLATE_ID, mockPictures));
var bigPictureCloseButton = document.querySelector('.big-picture__cancel');

bigPictureCloseButton.addEventListener('click', function () {
  hideBigPicture();
});

bigPictureCloseButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    hideBigPicture();
  }
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESCAPE_KEYCODE) {
    hideBigPicture();
  }
});

hideElement('.social__comment-count');
hideElement('.comments-loader');
