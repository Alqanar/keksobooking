'use strict';

(function () {
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
        x: getRandomInteger(0, 1200),
        y: getRandomInteger(130, 630)
      };

      arr.push({
        id: i,

        author: {
          avatar: 'img/avatars/user0' + avatarNums[i] + '.png'
        },

        offer: {
          title: randomTitles[i],
          address: location.x + ', ' + location.y,
          price: getRandomInteger(1000, 1000000),
          type: randomTypes[getRandomInteger(0, randomTypes.length - 1)],
          rooms: getRandomInteger(1, 5),
          guests: getRandomInteger(1, 10),
          checkin: getRandomInteger(12, 14) + ':00',
          checkout: getRandomInteger(12, 14) + ':00',
          features: getSlicedMixedArray(servicesArrs),
          description: '',
          photos: getMixedArray(photosArrs)
        },

        location: location
      });
    }
    return arr;
  }

  window.data = generateData();
})();
