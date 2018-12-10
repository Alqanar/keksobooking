'use strict';

(function () {
  function recordCoordinates() {
    window.form.setAddress(window.map.getCoordinates());
  }

  function activatePage() {
    window.backend.getData(
        function (data) {
          window.data = data;
          window.general.specifyId(data);
          window.form.changeStatus();
          window.map.activate();
          window.map.outputPins(window.data);
        },
        function (error) {
          window.displayMessage(error, true);
        }
    );
  }

  recordCoordinates();
  window.map.setMouseUpCallback(activatePage);
  window.map.setMouseMoveCallback(recordCoordinates);

  window.form.setFormButtonsCallback(function () {
    window.map.activate();
    window.map.deactivatePage();
    window.map.setMouseUpCallback(activatePage);
    recordCoordinates();
  });

  window.card.setCloseCardCallback(window.map.deleteClassPin);
})();
