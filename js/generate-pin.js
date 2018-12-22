'use strict';

(function () {
  var WIDTH_SMALL_PIN = 50;
  var HEIGHT_SMALL_PIN = 70;
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

  window.generatePin = function (pinData) {
    var clonedPin = templatePin.cloneNode(true);
    var image = clonedPin.querySelector('img');

    clonedPin.style.left = pinData.location.x - WIDTH_SMALL_PIN / 2 + 'px';
    clonedPin.style.top = pinData.location.y - HEIGHT_SMALL_PIN + 'px';
    clonedPin.setAttribute('pin-id', pinData.id);
    image.src = pinData.author.avatar;
    image.alt = pinData.offer.title;

    return clonedPin;
  };
})();
