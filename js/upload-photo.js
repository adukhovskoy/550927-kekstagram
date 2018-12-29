'use strict';

(function () {
  var UPLOAD_BUTTON_ID = '#upload-file';
  var UPLOAD_CANCEL_BUTTON_ID = '#upload-cancel';
  var UPLOAD_OVERLAY_CLASS = '.img-upload__overlay';
  var UPLOAD_FORM_CLASS = '.img-upload__form';
  var IMAGE_UPLOAD_PREVIEW_CLASS = '.img-upload__preview';
  var UPLOAD_SUCCESS_ID = '#success';
  var UPLOAD_ERROR_ID = '#error';
  var UPLOAD_SUCCESS_SECTION_CLASS = '.success';
  var UPLOAD_ERROR_SECTION_CLASS = '.error';
  var UPLOAD_SUCCESS_DIALOG_CLASS = '.success__inner';
  var UPLOAD_ERROR_DIALOG_CLASS = '.error__inner';
  var UPLOAD_SUCCESS_BUTTON_CLASS = '.success__button';
  var UPLOAD_ERROR_BUTTON_CLASS = '.error__button';

  var uploadFormElement = document.querySelector(UPLOAD_FORM_CLASS);
  var uploadButtonElement = document.querySelector(UPLOAD_BUTTON_ID);
  var uploadPreviewElement = document.querySelector(IMAGE_UPLOAD_PREVIEW_CLASS);
  var uploadPreviewImageElement = uploadPreviewElement.querySelector('img');
  var hashTagsInput = document.querySelector('.text__hashtags');
  var commentInput = document.querySelector('.text__description');
  var main = document.querySelector('main');
  var uploadSuccessTemplate = document.querySelector(UPLOAD_SUCCESS_ID).content.querySelector(UPLOAD_SUCCESS_SECTION_CLASS);
  var uploadErrorTemplate = document.querySelector(UPLOAD_ERROR_ID).content.querySelector(UPLOAD_ERROR_SECTION_CLASS);
  var uploadSuccessButton = '';
  var uploadErrorButtons = '';

  hashTagsInput.addEventListener('keydown', function (evt) {
    if (window.util.isEscEvent(evt)) {
      evt.stopPropagation();
    }
  });

  commentInput.addEventListener('keydown', function (evt) {
    if (window.util.isEscEvent(evt)) {
      evt.stopPropagation();
    }
  });

  var onUploadOverlayEscKeydown = function (evt) {
    if (window.util.isEscEvent(evt)) {
      hideUploadOverlay();
    }
  };

  var showUploadOverlay = function () {
    window.util.showElement(UPLOAD_OVERLAY_CLASS);
    document.addEventListener('keydown', onUploadOverlayEscKeydown);
  };

  var hideUploadOverlay = function () {
    window.util.hideElement(UPLOAD_OVERLAY_CLASS);
    uploadFormElement.reset();
    document.removeEventListener('keydown', onUploadOverlayEscKeydown);
  };

  var hideUploadSuccess = function () {
    window.util.hideElement(UPLOAD_SUCCESS_SECTION_CLASS);
    document.removeEventListener('keydown', onUploadSuccessEscKeydown);
    document.removeEventListener('click', onUploadSuccessClickOutside);
  };

  var onUploadSuccessEscKeydown = function (evt) {
    if (window.util.isEscEvent(evt)) {
      hideUploadSuccess();
    }
  };

  var onUploadSuccessClickOutside = function (evt) {
    if (!evt.target.closest(UPLOAD_SUCCESS_DIALOG_CLASS)) {
      hideUploadSuccess();
    }
  };

  var showUploadSuccess = function () {
    if (!document.querySelector(UPLOAD_SUCCESS_SECTION_CLASS)) {
      var uploadSuccessElement = uploadSuccessTemplate.cloneNode(true);
      main.appendChild(uploadSuccessElement);
      uploadSuccessButton = document.querySelector(UPLOAD_SUCCESS_BUTTON_CLASS);
    }
    uploadSuccessButton.addEventListener('click', hideUploadSuccess);
    document.addEventListener('keydown', onUploadSuccessEscKeydown);
    document.addEventListener('click', onUploadSuccessClickOutside);
    window.util.showElement(UPLOAD_SUCCESS_SECTION_CLASS);
    hideUploadOverlay();
  };

  var hideUploadError = function () {
    window.util.hideElement(UPLOAD_ERROR_SECTION_CLASS);
    document.removeEventListener('keydown', onUploadErrorEscKeydown);
    document.removeEventListener('click', onUploadErrorClickOutside);
  };

  var onUploadErrorEscKeydown = function (evt) {
    if (window.util.isEscEvent(evt)) {
      hideUploadError();
    }
  };

  var onUploadErrorClickOutside = function (evt) {
    if (!evt.target.closest(UPLOAD_ERROR_DIALOG_CLASS)) {
      hideUploadError();
    }
  };

  var showUploadError = function () {
    if (!document.querySelector(UPLOAD_ERROR_SECTION_CLASS)) {
      var uploadErrorElement = uploadErrorTemplate.cloneNode(true);
      main.appendChild(uploadErrorElement);
      uploadErrorButtons = document.querySelectorAll(UPLOAD_ERROR_BUTTON_CLASS);
      uploadErrorButtons = Array.prototype.slice.call(uploadErrorButtons);
    }
    uploadErrorButtons.forEach(function (uploadErrorButton) {
      uploadErrorButton.addEventListener('click', hideUploadError);
    });
    document.addEventListener('keydown', onUploadErrorEscKeydown);
    document.addEventListener('click', onUploadErrorClickOutside);
    window.util.showElement(UPLOAD_ERROR_SECTION_CLASS);
    hideUploadOverlay();
  };

  var updateImagePreview = function () {
    var imageFile = uploadButtonElement.files[0];
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      uploadPreviewImageElement.src = reader.result;
    });
    reader.readAsDataURL(imageFile);
  };

  uploadFormElement.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(uploadFormElement), showUploadSuccess, showUploadError);
    evt.preventDefault();
  });

  uploadButtonElement.addEventListener('change', function () {
    updateImagePreview();
    showUploadOverlay();
  });

  document.querySelector(UPLOAD_CANCEL_BUTTON_ID).addEventListener('click', hideUploadOverlay);

  window.uploadPhoto = {
    hashTagsInput: hashTagsInput,
    uploadPreviewElement: uploadPreviewElement,
    uploadPreviewImageElement: uploadPreviewImageElement
  };
})();
