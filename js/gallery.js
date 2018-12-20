'use strict';

(function () {
  var GALLERY_CLASS = '.pictures';
  var GALLERY_FILTERS_CLASS = '.img-filters';
  var GALLERY_FILTERS_BUTTON_CLASS = '.img-filters__button';
  var GALLERY_FILTER_POPULAR_ID = '#filter-popular';
  var GALLERY_FILTER_NEW_ID = '#filter-new';
  var GALLERY_FILTER_DISCUSSED_ID = '#filter-discussed';
  var GALLERY_FILTER_ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
  var GALLERY_BOUNCE_TIMEOUT = 500;
  var NEW_PICTURES_MAX_COUNT = 10;

  var galleryFiltersElement = document.querySelector(GALLERY_FILTERS_CLASS);

  var generateGallery = function (pictures) {
    var fragment = document.createDocumentFragment();
    pictures.forEach(function (picture) {
      var galleryElement = window.picture.generatePictureElement(picture);
      fragment.appendChild(galleryElement);
    });
    return (fragment);
  };

  var appendGalleryElement = function (fragment) {
    // не стал выносить наружу galleryElement т.к. каждый вызов может быть на DOM, изменённом через cleanGallery, наверно правильно переполучать элемент каждый раз
    var galleryElement = document.querySelector(GALLERY_CLASS);
    galleryElement.appendChild(fragment);
  };

  var cleanGallery = function () {
    var galleryPictures = document.querySelector(GALLERY_CLASS).querySelectorAll(window.picture.pictureClass);
    // попытался сделать через while (galleryElement.lastChild.classList.contains(window.picture.pictureClass.substring(1)))
    // но оно валит ошибку когда натыкается на элемент без класса, cannot .contains of undefined
    Array.prototype.forEach.call(galleryPictures, function (picture) {
      picture.parentNode.removeChild(picture);
    });
  };

  var showGalleryFilters = function () {
    galleryFiltersElement.classList.remove('img-filters--inactive');
  };

  var filterNewPictures = function (pictures) {
    var newPictures = [];
    while (newPictures.length < NEW_PICTURES_MAX_COUNT) {
      var currentPicture = pictures[window.util.getRandomIndex(pictures)];
      if (!newPictures.includes(currentPicture)) {
        newPictures.push(currentPicture);
      }
    }
    return (newPictures);
  };

  var filterDiscussedPictures = function (pictures) {
    return pictures.slice().sort(function (a, b) {
      if (a.comments.length < b.comments.length) {
        return 1;
      } else if (a.comments.length > b.comments.length) {
        return -1;
      } else {
        if (a.likes < b.likes) {
          return 1;
        } else if (a.likes > b.likes) {
          return -1;
        } else {
          return 0;
        }
      }
    });
  };

  var initGallery = function (xhrResponse) {
    // изначально было 3 хендлера но они делали одно и то же кроме filterNewPictures и filterDiscussedPictures, вынес их в callback, норм?
    var createFilterClick = function (callback) {
      var lastTimeout;
      var onFilterPopularClick = function (evt) {
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        window.setTimeout(function () {
          cleanGallery();
          if (callback) {
            appendGalleryElement(generateGallery(callback(xhrResponse)));
          } else {
            appendGalleryElement(generateGallery(xhrResponse));
          }
          var galleryFilterButtons = galleryFiltersElement.querySelectorAll(GALLERY_FILTERS_BUTTON_CLASS);
          Array.prototype.forEach.call(galleryFilterButtons, function (button) {
            if (!(button === evt.target)) {
              button.classList.toggle(GALLERY_FILTER_ACTIVE_BUTTON_CLASS, false);
            } else {
              button.classList.toggle(GALLERY_FILTER_ACTIVE_BUTTON_CLASS, true);
            }
          });
        }, GALLERY_BOUNCE_TIMEOUT);
      };
      return (onFilterPopularClick);
    };

    appendGalleryElement(generateGallery(xhrResponse));
    showGalleryFilters();
    var onFilterPopularClick = createFilterClick();
    var onFilterNewClick = createFilterClick(filterNewPictures);
    var onFilterDiscussedClick = createFilterClick(filterDiscussedPictures);
    document.querySelector(GALLERY_FILTER_POPULAR_ID).addEventListener('click', onFilterPopularClick);
    document.querySelector(GALLERY_FILTER_NEW_ID).addEventListener('click', onFilterNewClick);
    document.querySelector(GALLERY_FILTER_DISCUSSED_ID).addEventListener('click', onFilterDiscussedClick);
  };

  window.backend.download(initGallery, function () {
  });
})();
