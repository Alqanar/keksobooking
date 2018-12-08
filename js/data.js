'use strict';

(function () {
  window.backend.getData(
      function (data) {
        window.data = data;
        for (var i = 0; i < data.length; i++) {
          data[i].id = i;
        }
      },
      window.general.displayError
  );
})();
