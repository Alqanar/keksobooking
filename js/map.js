'use strict';

var WIDTH_PIN = 62;
var HEIGHT_PIN = 82;
var RUS_TYPE = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};
var map = document.querySelector('.map');
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var mapCard = document.querySelector('#card').content.querySelector('.map__card');

function getRandomInteger(min, max) {
  return min + Math.floor(Math.random() * (max + 1 - min));
}

function getRandomComparator() {
  return getRandomInteger(-1, 1);
}

function getMixedArray(list) {
  return list.slice(0).sort(getRandomComparator);
}

function getSlicedArray(list) {
  return list.slice(0, getRandomInteger(0, list.length));
}

function getSlicedMixedArray(list) {
  return getSlicedArray(getMixedArray(list));
}

function generateData() {
  var arr = [];
  var avatarNums = [1, 2, 3, 4, 5, 6, 7, 8];
  var randomTitles = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'];
  var randomTypes = ['palace', 'flat', 'house', 'bungalo'];
  var servicesArrs = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photosArrs = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var location = {};

  avatarNums = getMixedArray(avatarNums);

  for (var i = 0; i < 8; i++) {
    location = {
      'x': getRandomInteger(0, 1200),
      'y': getRandomInteger(130, 630)
    };

    arr.push({
      'author': {
        'avatar': 'img/avatars/user0' + avatarNums[i] + '.png'
      },

      'offer': {
        'title': randomTitles[i],
        'address': location.x + ', ' + location.y,
        'price': getRandomInteger(1000, 1000000),
        'type': randomTypes[getRandomInteger(0, randomTypes.length - 1)],
        'rooms': getRandomInteger(1, 5),
        'guests': getRandomInteger(1, 10),
        'checkin': getRandomInteger(12, 14) + ':00',
        'checkout': getRandomInteger(12, 14) + ':00',
        'features': getSlicedMixedArray(servicesArrs),
        'description': '',
        'photos': getMixedArray(photosArrs)
      },

      'location': location
    });
  }
  return arr;
}

map.classList.remove('map--faded');

function generatePin(pinData) {
  var clonePin = templatePin.cloneNode(true);
  var image = clonePin.querySelector('img');

  clonePin.style.left = pinData.location.x - WIDTH_PIN / 2 + 'px';
  clonePin.style.top = pinData.location.y - HEIGHT_PIN + 'px';
  image.src = pinData.author.avatar;
  image.alt = pinData.offer.title;

  return clonePin;
}

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

function fillFeatures(features, featuresContainer) {
  featuresContainer.innerHTML = '';

  featuresContainer.appendChild(features);
}

function fillPhoto(photos, photosContainer) {
  var elemPhoto = photosContainer.querySelector('img');

  elemPhoto.src = photos[0];

  for (var i = 1; i < photos.length; i++) {
    var anotherPhoto = elemPhoto.cloneNode();

    anotherPhoto.src = photos[i];
    photosContainer.appendChild(anotherPhoto);
  }
}

function generateCard(cardData) {
  var cloneCard = mapCard.cloneNode(true);
  var featuresContainer = cloneCard.querySelector('.popup__features');
  var photosContainer = cloneCard.querySelector('.popup__photos');

  cloneCard.querySelector('img').src = cardData.author.avatar;
  cloneCard.querySelector('.popup__title').textContent = cardData.offer.title;
  cloneCard.querySelector('.popup__text--address').textContent = cardData.offer.address;
  cloneCard.querySelector('.popup__text--price').textContent = cardData.offer.price + '₽/ночь';
  cloneCard.querySelector('.popup__type').textContent = RUS_TYPE[cardData.offer.type];
  cloneCard
    .querySelector('.popup__text--capacity')
    .textContent = cardData.offer.rooms + ' ' + getCaseForRoom(cardData.offer.rooms) + ' для ' + cardData.offer.guests + ' ' + getCaseForGuest(cardData.offer.guests);
  cloneCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
  fillFeatures(getNewElemFeatures(cardData.offer.features), featuresContainer);
  cloneCard.querySelector('.popup__description').textContent = cardData.offer.description;
  fillPhoto(cardData.offer.photos, photosContainer);

  return cloneCard;
}

var data = generateData();

function outputPin(inf) {
  var pinFragment = document.createDocumentFragment();
  var locationPin = document.querySelector('.map__pins');

  for (var i = 0; i < inf.length; i++) {
    pinFragment.appendChild(generatePin(inf[i]));
  }

  return locationPin.appendChild(pinFragment);
}

outputPin(data);


generateCard(data[3]);
