'use strict';

(function () {
  var ANY_VALUE = 'any';
  var form = document.querySelector('.map__filters');
  var selects = Array.from(document.querySelectorAll('.map__filter'));
  var features = Array.from(document.querySelectorAll('.map__checkbox'));
  var changeFilterCallback = null;

  function getFilteredData() {
    var selectsData = selects.reduce(function (obj, elem) {
      obj[elem.name] = elem.value;
      return obj;
    }, {});

    var selectedValueFeatures = features.filter(function (feature) {
      return feature.checked;
    })
    .map(function (item) {
      return item.value;
    });

    return window.data.filter(function (ad) {
      var priceCheck = true;
      switch (selectsData['housing-price']) {
        case 'middle':
          priceCheck = ad.offer.price >= 10000 && ad.offer.price <= 50000;
          break;
        case 'low':
          priceCheck = ad.offer.price < 10000;
          break;
        case 'high':
          priceCheck = ad.offer.price > 50000;
          break;
      }

      return (ad.offer.type === selectsData['housing-type'] || selectsData['housing-type'] === ANY_VALUE)
      && priceCheck
      && (ad.offer.rooms === parseInt(selectsData['housing-rooms'], 10) || selectsData['housing-rooms'] === ANY_VALUE)
      && (ad.offer.guests === parseInt(selectsData['housing-guests'], 10) || selectsData['housing-guests'] === ANY_VALUE)
      && selectedValueFeatures.every(function (item) {
        return ad.offer.features.includes(item);
      });
    }).slice(0, 5);
  }

  function filterDataHandler() {
    changeFilterCallback(getFilteredData());
  }

  var debouncedFilerDataHandler = window.general.debounce(filterDataHandler);

  form.addEventListener('change', debouncedFilerDataHandler);

  window.setChangeFilterCallback = function (callback) {
    changeFilterCallback = callback;
  };
})();
