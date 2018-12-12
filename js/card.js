'use strict';

(function () {
  var RUS_TYPE = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };
  var mapCard = document.querySelector('#card').content.querySelector('.map__card');
  var clonedCard;

  function getCaseForRoom(numRoom) {
    if (numRoom === 1) {
      return 'комната';
    } else if (numRoom === 5) {
      return 'комнат';
    }
    return 'комнаты';
  }

  function getCaseForGuest(numGuest) {
    return numGuest === 1 ? 'гостя' : 'гостей';
  }

  function getNewElemFeatures(facts) {
    var fragmentElems = document.createDocumentFragment();

    for (var i = 0; i < facts.length; i++) {
      var newLi = document.createElement('li');
      newLi.classList.add('popup__feature', 'popup__feature--' + facts[i]);
      fragmentElems.appendChild(newLi);
    }
    return fragmentElems;
  }

  function fillFeatures(features, featuresContainer, length) {
    featuresContainer.innerHTML = '';

    if (length) {
      featuresContainer.appendChild(features);
    } else {
      featuresContainer.classList.add('visually-hidden');
    }
  }

  function fillPhoto(photos, photosContainer) {
    var elemPhoto = photosContainer.querySelector('img');

    if (photos.length) {
      elemPhoto.src = photos[0];

      for (var i = 1; i < photos.length; i++) {
        var anotherPhoto = elemPhoto.cloneNode();

        anotherPhoto.src = photos[i];
        photosContainer.appendChild(anotherPhoto);
      }
    } else {
      photosContainer.classList.add('visually-hidden');
    }
  }

  function documentEscPressHandler(event) {
    window.general.isEscEvent(event, closePopup);
  }

  var closeCardCallback = null;

  function closePopup() {
    clonedCard.remove();
    if (closeCardCallback) {
      closeCardCallback();
    }
  }

  window.card = {
    generateCard: function (cardData) {
      clonedCard = mapCard.cloneNode(true);
      var featuresContainer = clonedCard.querySelector('.popup__features');
      var photosContainer = clonedCard.querySelector('.popup__photos');
      var popupClose = clonedCard.querySelector('.popup__close');

      clonedCard.querySelector('img').src = cardData.author.avatar;
      clonedCard.querySelector('.popup__title').textContent = cardData.offer.title;
      clonedCard.querySelector('.popup__text--address').textContent = cardData.offer.address;
      clonedCard.querySelector('.popup__text--price').textContent = cardData.offer.price + '₽/ночь';
      clonedCard.querySelector('.popup__type').textContent = RUS_TYPE[cardData.offer.type];
      clonedCard
        .querySelector('.popup__text--capacity')
        .textContent = cardData.offer.rooms + ' ' + getCaseForRoom(cardData.offer.rooms) + ' для ' + cardData.offer.guests + ' ' + getCaseForGuest(cardData.offer.guests);
      clonedCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
      fillFeatures(getNewElemFeatures(cardData.offer.features), featuresContainer, cardData.offer.features.length);
      clonedCard.querySelector('.popup__description').textContent = cardData.offer.description;
      fillPhoto(cardData.offer.photos, photosContainer);
      document.addEventListener('keydown', documentEscPressHandler);

      popupClose.addEventListener('click', closePopup);

      return clonedCard;
    },

    setCloseCardCallback: function (callback) {
      closeCardCallback = callback;
    }
  };
})();
