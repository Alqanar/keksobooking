'use strict';

(function () {
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

  window.pin = {
    WIDTH_PIN: 62,
    HEIGHT_PIN: 82,

    generatePin: function (pinData) {
      var clonePin = templatePin.cloneNode(true);
      var image = clonePin.querySelector('img');

      clonePin.style.left = pinData.location.x - window.pin.WIDTH_PIN / 2 + 'px';
      clonePin.style.top = pinData.location.y - window.pin.HEIGHT_PIN + 'px';
      clonePin.setAttribute('pin-id', pinData.id);
      image.src = pinData.author.avatar;
      image.alt = pinData.offer.title;

      return clonePin;
    }
  };
})();
