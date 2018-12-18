'use strict';

(function () {
  var WIDTH_SMALL_PIN = 50;
  var HEIGHT_SMALL_PIN = 70;
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

  window.generatePin = function (pinData) {
    var clonePin = templatePin.cloneNode(true);
    var image = clonePin.querySelector('img');

    clonePin.style.left = pinData.location.x - WIDTH_SMALL_PIN / 2 + 'px';
    clonePin.style.top = pinData.location.y - HEIGHT_SMALL_PIN + 'px';
    clonePin.setAttribute('pin-id', pinData.id);
    image.src = pinData.author.avatar;
    image.alt = pinData.offer.title;

    return clonePin;
  };
})();
