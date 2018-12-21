'use strict';

(function () {
  var WIDTH_MAIN_PIN = 62;
  var HEIGHT_MAIN_PIN = 82;
  var WINDOW_START_X = 0;
  var WINDOW_END_X = 1200;
  var WINDOW_START_Y = 130;
  var WINDOW_END_Y = 630;
  var MAIN_PIN_VALUE_LEFT = 570;
  var MAIN_PIN_VALUE_TOP = 375;
  var map = document.querySelector('.map');
  var locationPin = document.querySelector('.map__pins');
  var filtersContainer = document.querySelector('.map__filters-container');
  var mainPin = document.querySelector('.map__pin--main');
  var mouseUpCallback;
  var mouseMoveCallback;
  var lastClickedPin = null;
  var activeClassPin = 'map__pin--active';


  function outputCard(adObject) {
    filtersContainer.before(window.card.generate(adObject));
  }

  function correctPinX(x) {
    if (x < WINDOW_START_X - WIDTH_MAIN_PIN / 2) {
      x = WINDOW_START_X - WIDTH_MAIN_PIN / 2;
    } else if (x > WINDOW_END_X - WIDTH_MAIN_PIN / 2) {
      x = WINDOW_END_X - WIDTH_MAIN_PIN / 2;
    }
    return x;
  }

  function correctPinY(y) {
    if (y < WINDOW_START_Y - HEIGHT_MAIN_PIN) {
      y = WINDOW_START_Y - HEIGHT_MAIN_PIN;
    } else if (y > WINDOW_END_Y - HEIGHT_MAIN_PIN) {
      y = WINDOW_END_Y - HEIGHT_MAIN_PIN;
    }
    return y;
  }

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

      mainPin.style.left = correctPinX(mainPin.offsetLeft - newCoords.x) + 'px';
      mainPin.style.top = correctPinY(mainPin.offsetTop - newCoords.y) + 'px';

      if (mouseMoveCallback) {
        mouseMoveCallback();
      }
    }

    function mainPinMouseUpHandler() {
      if (mouseUpCallback) {
        mouseUpCallback();
        mouseUpCallback = null;
      }

      document.removeEventListener('mousemove', mainPinMouseMoveHandler);
      document.removeEventListener('mouseup', mainPinMouseUpHandler);
    }

    document.addEventListener('mousemove', mainPinMouseMoveHandler);
    document.addEventListener('mouseup', mainPinMouseUpHandler);
  }

  function removeCard() {
    var cardAd = document.querySelector('.map__card');
    if (cardAd) {
      cardAd.remove();
    }
  }

  function pinClickHandler(event) {
    var target = event.target;
    var pin = target.closest('.map__pin:not(.map__pin--main)');
    if (pin) {
      pin.classList.add(activeClassPin);
      deleteClassPin();
      lastClickedPin = pin;
      removeCard();
      outputCard(window.data[pin.getAttribute('pin-id')]);
    }
  }

  function removePins() {
    var listMapPins = Array.from(document.querySelectorAll('.map__pin:not(.map__pin--main)'));
    listMapPins.forEach(function (item) {
      item.remove();
    });
  }

  function deleteClassPin() {
    if (lastClickedPin) {
      lastClickedPin.classList.remove(activeClassPin);
    }
  }

  function clearMapComponents() {
    removePins();
    removeCard();
  }

  window.card.setCloseCallback(deleteClassPin);

  mainPin.addEventListener('mousedown', mainPinMouseDownHandler);
  locationPin.addEventListener('click', pinClickHandler);

  window.filters.setChangeCallback(function (elems) {
    clearMapComponents();
    window.map.outputPins(elems);
  });

  window.map = {
    getCoordinates: function () {
      return {
        x: mainPin.offsetLeft + WIDTH_MAIN_PIN / 2,
        y: mainPin.offsetTop + HEIGHT_MAIN_PIN
      };
    },

    outputPins: function (info) {
      var pinFragment = document.createDocumentFragment();

      for (var i = 0; i < info.length; i++) {
        if (info[i].offer) {
          pinFragment.appendChild(window.generatePin(info[i]));
        }
      }

      return locationPin.appendChild(pinFragment);
    },

    changeState: function () {
      map.classList.toggle('map--faded');
    },

    setMouseMoveCallback: function (callback) {
      mouseMoveCallback = callback;
    },

    setMouseUpCallback: function (callback) {
      mouseUpCallback = callback;
    },

    clear: function () {
      clearMapComponents();
      mainPin.style.left = MAIN_PIN_VALUE_LEFT + 'px';
      mainPin.style.top = MAIN_PIN_VALUE_TOP + 'px';
    }
  };
})();
