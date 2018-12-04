'use strict';

(function () {
  var map = document.querySelector('.map');
  var locationPin = document.querySelector('.map__pins');
  var filtersContainer = document.querySelector('.map__filters-container');

  // COMMENT output pin && card

  function outputPins(info) {
    var pinFragment = document.createDocumentFragment();

    for (var i = 0; i < info.length; i++) {
      pinFragment.appendChild(window.pin.generatePin(info[i]));
    }

    return locationPin.appendChild(pinFragment);
  }

  function outputCard(adObject) {
    filtersContainer.before(window.generateCard(adObject));
  }

  // COMMENT inicialisation

  var filterAd = document.querySelector('.map__filters');
  var mainPin = document.querySelector('.map__pin--main');

  window.form.switchDisabledField(filterAd);

  function getCoordinates() {
    return {
      x: mainPin.offsetLeft + window.pin.WIDTH_PIN / 2,
      y: mainPin.offsetTop + window.pin.HEIGHT_PIN
    };
  }

  function activatePage() {
    window.form.setAddress(getCoordinates());

    if (map.className !== 'map') {
      map.classList.toggle('map--faded');
      window.form.switchDisableClassForm();
      window.form.switchDisabledField(filterAd);
      window.form.switchDisabledField(document.querySelector('.ad-form'));
      outputPins(window.data);
    }
  }

  // COMMENT drug-and-drop

  function mainPinMouseDownHandler(event) {
    var startCoords = {
      x: event.clientX,
      y: event.clientY
    };

    function mainPinMouseMoveHandler(moveEvt) {
      var newCoords = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.left = mainPin.offsetLeft - newCoords.x + 'px';
      mainPin.style.top = mainPin.offsetTop - newCoords.y + 'px';
    }

    function mainPinMouseUpHandler() {
      activatePage();

      document.removeEventListener('mousemove', mainPinMouseMoveHandler);
      document.removeEventListener('mouseup', mainPinMouseUpHandler);
    }

    document.addEventListener('mousemove', mainPinMouseMoveHandler);
    document.addEventListener('mouseup', mainPinMouseUpHandler);
  }

  document.addEventListener('mousedown', mainPinMouseDownHandler);

  function pinClickHandler(event) {
    var cardAd = document.querySelector('.map__card');
    var target = event.target;
    var pin = target.closest('.map__pin:not(.map__pin--main)');
    if (pin) {
      if (cardAd) {
        cardAd.remove();
      }
      outputCard(window.data[pin.getAttribute('pin-id')]);
    }
  }

  locationPin.addEventListener('click', pinClickHandler);
})();
