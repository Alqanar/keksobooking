'use strict';

(function () {
  function activatePage() {
    window.form.setAddress(window.map.getCoordinates());
    window.form.activate();
    window.map.activate();
  }

  window.map.setActivateCallback(activatePage);
})();
