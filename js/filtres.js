'use strict';

(function () {
  var ANY_VALUE = 'any';
  var form = document.querySelector('.map__filters');
  var selects = Array.from(document.querySelectorAll('.map__filter'));
  var features = Array.from(document.querySelectorAll('.map__checkbox'));
  var changeFilterCallback = null;

  function checkFeatures(offerFeatures) {
    return function (item) {
      return offerFeatures.some(function (offerFeature) {
        return offerFeature === item;
      });
    };
  }

  function filterData() {
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

    var filteredData = window.data.filter(function (elem) {
      var priceCheck = true;
      switch (selectsData['housing-price']) {
        case 'middle':
          priceCheck = elem.offer.price >= 10000 && elem.offer.price <= 50000;
          break;
        case 'low':
          priceCheck = elem.offer.price < 10000;
          break;
        case 'high':
          priceCheck = elem.offer.price > 50000;
          break;
      }

      return (elem.offer.type === selectsData['housing-type'] || selectsData['housing-type'] === ANY_VALUE)
      && priceCheck
      && (elem.offer.rooms === parseInt(selectsData['housing-rooms'], 10) || selectsData['housing-rooms'] === ANY_VALUE)
      && (elem.offer.guests === parseInt(selectsData['housing-guests'], 10) || selectsData['housing-guests'] === ANY_VALUE)
      && selectedValueFeatures.every(checkFeatures(elem.offer.features));
    }).slice(0, 5);

    changeFilterCallback(filteredData);
  }

  form.addEventListener('change', filterData);

  window.setChangeFilterCallback = function (callback) {
    changeFilterCallback = callback;
  };
})();
