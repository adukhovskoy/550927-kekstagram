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
  var galleryElement = document.querySelector(GALLERY_CLASS);

  var generateGallery = function (pictures) {
    var fragment = document.createDocumentFragment();
    pictures.forEach(function (picture) {
      var galleryPictureElement = window.picture.generateElement(picture);
      fragment.appendChild(galleryPictureElement);
    });
    return (fragment);
  };

  var appendGalleryElement = function (fragment) {
    galleryElement.appendChild(fragment);
  };

  var cleanGallery = function () {
    var galleryPicturesElements = galleryElement.querySelectorAll(window.picture.CLASS);
    Array.prototype.forEach.call(galleryPicturesElements, function (picture) {
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
        }
        return 0;
      }
    });
  };

  var initGallery = function (xhrResponse) {
    var createFilterClick = function (callback) {
      var lastTimeout;
      var onFilterPopularClick = function (evt) {
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
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
