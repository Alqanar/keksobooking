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
  var clonedCard = mapCard.cloneNode(true);
  var featuresContainer = clonedCard.querySelector('.popup__features');
  var photosContainer = clonedCard.querySelector('.popup__photos');

  clonedCard.querySelector('img').src = cardData.author.avatar;
  clonedCard.querySelector('.popup__title').textContent = cardData.offer.title;
  clonedCard.querySelector('.popup__text--address').textContent = cardData.offer.address;
  clonedCard.querySelector('.popup__text--price').textContent = cardData.offer.price + '₽/ночь';
  clonedCard.querySelector('.popup__type').textContent = RUS_TYPE[cardData.offer.type];
  clonedCard
    .querySelector('.popup__text--capacity')
    .textContent = cardData.offer.rooms + ' ' + getCaseForRoom(cardData.offer.rooms) + ' для ' + cardData.offer.guests + ' ' + getCaseForGuest(cardData.offer.guests);
  clonedCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
  fillFeatures(getNewElemFeatures(cardData.offer.features), featuresContainer);
  clonedCard.querySelector('.popup__description').textContent = cardData.offer.description;
  fillPhoto(cardData.offer.photos, photosContainer);

  clonedCard.querySelector('.popup__close').addEventListener('click', function remove() {
    clonedCard.remove();
  });

  return clonedCard;
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
  filtersContainer.before(generateCard(adObject));
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

function mainPinMouseUpHandler() {

  map.classList.toggle('map--faded');
  formAd.classList.toggle('ad-form--disabled');
  switchDisabledToForm(filterAd);
  switchDisabledToForm(formAd);
  outputPins(data);
  outputCard(data[0]);

  mainPin.removeEventListener('click', mainPinMouseUpHandler);

}

switchDisabledToForm(filterAd);
switchDisabledToForm(formAd);

mainPin.addEventListener('click', mainPinMouseUpHandler);

function setAddress(coords) {
  fieldAddress.value = coords.x + ', ' + coords.y;
}

function getCoordinates() {
  return {
    x: mainPin.offsetLeft + WIDTH_PIN / 2,
    y: mainPin.offsetTop + HEIGHT_PIN
  };
}

setAddress(getCoordinates());

function pinClickHandler(event) {
  var cardAd = document.querySelector('.map__card');
  var target = event.target;
  var pin = target.closest('.map__pin:not(.map__pin--main)');
  if (pin) {
    if (cardAd) {
      cardAd.remove();
    }
    outputCard(data[pin.getAttribute('pin-id')]);
  }
}

locationPin.addEventListener('click', pinClickHandler);


// COMMENT module4-task2 form of ad


(function () {
  var price = document.querySelector('#price');
  var typeOfHousing = document.querySelector('#type');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var numberRoom = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var minPrices = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'};

  function setAttributes(el, attrs) {
    for (var attribute in attrs) {
      if (attrs.hasOwnProperty(attribute)) {
        el[attribute] = attrs[attribute];
      }
    }
  }

  function changePriceDependingOnHousing() {
    var params = {'min': '', 'placeholder': ''};
    params.min = minPrices[typeOfHousing.value];
    params.placeholder = 'от ' + params.min + ' до ' + price.max;
    setAttributes(price, params);
    validatePrice();
  }

  function validatePrice() {
    price.setCustomValidity(
        price.value < price.min || price.value > price.max
          ? 'Введено неверное значение! Введите значение от ' + price.min + ' до ' + price.max
          : '');
  }

  function changeTimeHandler(event) {
    timeIn.value = event.target.value;
    timeOut.value = event.target.value;
  }

  function validateCapacity() {
    var capacityInt = parseInt(capacity.value, 10);
    var label = 'Введено неверное значение! Для ';
    var condition;

    switch (parseInt(numberRoom.value, 10)) {
      case 1:
        condition = capacityInt !== 1;
        label += '1 комнаты возможное количество мест: "для 1 гостя"';
        break;
      case 2:
        condition = capacityInt !== 1 && capacityInt !== 2;
        label += '2 комнаты возможное количество мест: "для 1 гостя" или "для 2 гостей"';
        break;
      case 3:
        condition = capacityInt === 0;
        label += '3 комнат невозможно выбрать: "не для гостей"';
        break;
      case 100:
        condition = capacityInt !== 0;
        label += '100 комнат возможно выбрать только: "не для гостей"';
        break;
    }
    capacity.setCustomValidity(condition ? label : '');
  }

  function validatePriceHandler() {
    validatePrice();
  }

  function validateCapacityHandler() {
    validateCapacity();
  }

  function changePriceDependingOnHousingHandler() {
    changePriceDependingOnHousing();
  }

  validateCapacity();
  validatePrice();
  changePriceDependingOnHousing();

  typeOfHousing.addEventListener('change', changePriceDependingOnHousingHandler);
  price.addEventListener('change', validatePriceHandler);
  timeIn.addEventListener('change', changeTimeHandler);
  timeOut.addEventListener('change', changeTimeHandler);
  numberRoom.addEventListener('change', validateCapacityHandler);
  capacity.addEventListener('change', validateCapacityHandler);
})();

