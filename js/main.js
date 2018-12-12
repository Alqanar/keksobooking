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

  function deactivatePage() {
    window.form.changeStatus();
    window.form.resetForm();
    window.map.activate();
    window.map.clear();
    window.map.setMouseUpCallback(activatePage);
    recordCoordinates();
  }

  function sendDataForm() {
    window.backend.sendData(
        window.form.getFormData(),
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
