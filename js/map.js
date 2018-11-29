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
var locationPin = document.querySelector('.map__pins');
var filtersContainer = document.querySelector('.map__filters-container');
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
      'id': i,

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

function generatePin(pinData) {
  var clonePin = templatePin.cloneNode(true);
  var image = clonePin.querySelector('img');

  clonePin.style.left = pinData.location.x - WIDTH_PIN / 2 + 'px';
  clonePin.style.top = pinData.location.y - HEIGHT_PIN + 'px';
  clonePin.setAttribute('pin-id', pinData.id);
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

function outputPins(info) {
  var pinFragment = document.createDocumentFragment();

  for (var i = 0; i < info.length; i++) {
    pinFragment.appendChild(generatePin(info[i]));
  }

  return locationPin.appendChild(pinFragment);
}

function outputCard(adObject) {
  var result = filtersContainer.before(generateCard(adObject));
  document.querySelector('.popup__close').addEventListener('click', function remove() {
    document.querySelector('.map__card').remove();
  });
  return result;
}

// COMMENT fourth task

var filterAd = document.querySelector('.map__filters');
var formAd = document.querySelector('.ad-form');
var mainPin = document.querySelector('.map__pin--main');
var fieldAddress = document.querySelector('#address');

function switchDisabledToForm(element) {
  var elems = element.querySelectorAll('.' + element.className.replace(' ', '.') + ' > *');

  for (var i = 0; i < elems.length; i++) {
    elems[i].disabled = !elems[i].disabled;
  }
}

function removePins(list) {
  for (var i = 0; i < list.length; i++) {
    list[i].remove();
  }
}

function switchingMapHandler() {
  var listMapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  var cardAd = document.querySelector('.map__card');

  map.classList.toggle('map--faded');
  formAd.classList.toggle('ad-form--disabled');
  switchDisabledToForm(filterAd);
  switchDisabledToForm(formAd);

  if (map.classList.contains('map--faded')) {
    removePins(listMapPins);
    cardAd.remove();
  } else {
    outputPins(data);
    outputCard(data[0]);
  }
}

switchDisabledToForm(filterAd);
switchDisabledToForm(formAd);

mainPin.addEventListener('click', switchingMapHandler);

fieldAddress.setAttribute('value', map.offsetWidth / 2 + ', ' + map.offsetHeight / 2);

function getRelativeCoords(x, y) {
  return {
    xCoord: x - (document.documentElement.clientWidth - map.offsetWidth) / 2,
    yCoord: y + window.pageYOffset
  };
}

function getCoordinatesHandler(event) {
  var coords = getRelativeCoords(event.clientX, event.clientY);

  fieldAddress.setAttribute('value', coords.xCoord + ', ' + coords.yCoord);
  mainPin.style.left = coords.xCoord - WIDTH_PIN / 2 + 'px';
  mainPin.style.top = coords.yCoord - HEIGHT_PIN + 'px';
}

mainPin.addEventListener('mouseup', getCoordinatesHandler);

function paintCardOfElem(event) {
  var cardAd = document.querySelector('.map__card');
  var target = event.target;

  while (target !== locationPin) {

    if (target.classList.contains('map__pin') && !target.classList.contains('map__pin--main')) {
      if (cardAd) {
        cardAd.remove();
      }
      outputCard(data[target.getAttribute('pin-id')]);
      return;
    }
    target = target.parentNode;
  }
}

locationPin.addEventListener('click', paintCardOfElem);
