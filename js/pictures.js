'use strict';

var MOCK_PICTURES_COUNT = 25;
var MOCK_LIKES_MIN = 15;
var MOCK_LIKES_MAX = 200;
var COMMENTS_MIN = 0;
var COMMENTS_MAX = 10;
var COMMENTS_SENTENCES_MAX = 2;
var MOCK_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var MOCK_DESCRIPTIONS = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var showElement = function (selector) {
  var element = document.querySelector(selector);
  element.classList.remove('hidden');
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
        var commentString = mockComments[getRandomInRange(0, mockComments.length - 1)];
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
    var description = mockDescriptions[getRandomInRange(0, mockDescriptions.length - 1)];
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

showElement('.big-picture');
generateMockPictures(MOCK_PICTURES_COUNT, MOCK_LIKES_MIN, MOCK_LIKES_MAX, COMMENTS_MIN, COMMENTS_MAX, COMMENTS_SENTENCES_MAX, MOCK_COMMENTS, MOCK_DESCRIPTIONS);
