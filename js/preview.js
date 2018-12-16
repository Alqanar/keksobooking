'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var MUFFIN_URL = 'img/muffin-grey.svg';

  var avatarChooser = document.querySelector('.ad-form-header__input');
  var photoAdChooser = document.querySelector('.ad-form__input');
  var containerPhoto = document.querySelector('.ad-form__photo');
  var parentContainerPhoto = document.querySelector('.ad-form__photo-container');
  var firstClick = true;

  function processFile(input, image) {
    var file = input.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        image.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  }

  function showPreviewAd() {
    var photoNode;
    var imageNode;

    if (!photoAdChooser.files.length) {
      return;
    }

    if (firstClick) {
      imageNode = document.createElement('img');
      photoNode = containerPhoto;

      imageNode.alt = 'фотография жилья';
      imageNode.width = '70';
      imageNode.height = '70';
      imageNode.style = 'object-fit: cover';

      containerPhoto.appendChild(imageNode);

      firstClick = false;
    } else {
      photoNode = containerPhoto.cloneNode(true);
      imageNode = photoNode.querySelector('img');
    }

    imageNode.src = MUFFIN_URL;
    processFile(photoAdChooser, imageNode);

    if (!firstClick) {
      parentContainerPhoto.appendChild(photoNode);
    }
  }

  avatarChooser.addEventListener('change', function () {
    processFile(avatarChooser, document.querySelector('.ad-form-header__user-pic'));
  });

  photoAdChooser.addEventListener('change', function () {
    showPreviewAd();
  });
})();
