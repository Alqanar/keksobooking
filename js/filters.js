'use strict';

(function () {
  var ANY_VALUE = 'any';
  var INITIAL_PIN_NUMBER = 0;
  var MAX_PIN_NUMBER = 5;
  var AveragePrice = {
    MIN: 10000,
    MAX: 50000
  };
  var form = document.querySelector('.map__filters');
  var selects = Array.from(document.querySelectorAll('.map__filter'));
  var features = Array.from(document.querySelectorAll('.map__checkbox'));
  var changeFilterCallback = null;

  window.general.switchDisabledField(form);

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
          priceCheck = ad.offer.price >= AveragePrice.MIN && ad.offer.price <= AveragePrice.MAX;
          break;
        case 'low':
          priceCheck = ad.offer.price < AveragePrice.MIN;
          break;
        case 'high':
          priceCheck = ad.offer.price > AveragePrice.MAX;
          break;
      }

      return (ad.offer.type === selectsData['housing-type'] || selectsData['housing-type'] === ANY_VALUE)
      && priceCheck
      && (ad.offer.rooms === parseInt(selectsData['housing-rooms'], 10) || selectsData['housing-rooms'] === ANY_VALUE)
      && (ad.offer.guests === parseInt(selectsData['housing-guests'], 10) || selectsData['housing-guests'] === ANY_VALUE)
      && selectedValueFeatures.every(function (item) {
        return ad.offer.features.includes(item);
      });
    }).slice(INITIAL_PIN_NUMBER, MAX_PIN_NUMBER);
  }

  function filterDataHandler() {
    changeFilterCallback(getFilteredData());
  }

  var debouncedFilerDataHandler = window.general.debounce(filterDataHandler);

  form.addEventListener('change', debouncedFilerDataHandler);

  window.filters = {
    changeState: function () {
      form.reset();
      window.general.switchDisabledField(form);
    },

    setChangeCallback: function (callback) {
      changeFilterCallback = callback;
    },
  };
})();
