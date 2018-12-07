'use strict';

(function () {
  function recordCoordinates() {
    window.form.setAddress(window.map.getCoordinates());
  }

  function activatePage() {
    window.form.activate();
    window.map.activate();
    window.map.outputPins(window.data);
  }

  recordCoordinates();
  window.map.setMouseUpCallback(activatePage);
  window.map.setMouseMoveCallback(recordCoordinates);
})();
