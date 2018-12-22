'use strict';

(function () {
  var INITIAL_ITEM_INDEX = 0;
  var END_ITEM_INDEX = 5;

  function recordCoordinates() {
    window.form.setAddress(window.map.getCoordinates());
  }

  function activatePage() {
    window.backend.getData(
        function (data) {
          window.data = data;
          window.general.specifyId(data);
          window.form.changeStatus();
          window.filters.changeState();
          window.map.changeState();
          window.map.outputPins(window.data.slice(INITIAL_ITEM_INDEX, END_ITEM_INDEX));
        },
        function (error) {
          window.displayMessage(error, true);
        }
    );
  }

  function deactivatePage() {
    window.form.changeStatus();
    window.form.reset();
    window.preview.clearAvatar();
    window.preview.clearPhotosHouseAd();
    window.filters.changeState();
    window.map.changeState();
    window.map.clear();
    window.map.setMouseUpCallback(activatePage);
    recordCoordinates();
  }

  function sendDataForm() {
    window.backend.sendData(
        window.form.getData(),
        function () {
          window.displayMessage();
          deactivatePage();
        },
        function (error) {
          window.displayMessage(error, true);
        }
    );
  }

  recordCoordinates();
  window.map.setMouseUpCallback(activatePage);
  window.map.setMouseMoveCallback(recordCoordinates);

  window.form.setResetBtnClickCallback(deactivatePage);
  window.form.setSubmitBtnClickCallback(sendDataForm);

})();
