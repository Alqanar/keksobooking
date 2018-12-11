'use strict';

(function () {
  var formAd = document.querySelector('.ad-form');
  var fieldAddress = document.querySelector('#address');
  var price = document.querySelector('#price');
  var priceInt;
  var typeOfHousing = document.querySelector('#type');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var numberRoom = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var minPrices = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'};
  var submitBtnClickCallback = null;
  var resetBtnClickCallback = null;
  var drop = document.querySelector('.ad-form__reset');

  window.general.switchDisabledField(formAd);

  function setAttributes(el, attrs) {
    for (var attribute in attrs) {
      if (attrs.hasOwnProperty(attribute)) {
        el[attribute] = attrs[attribute];
      }
    }
  }

  function validatePrice() {
    price.setCustomValidity(
        priceInt < parseInt(price.min, 10) || priceInt > parseInt(price.max, 10)
          ? 'Введено неверное значение! Введите значение от ' + price.min + ' до ' + price.max
          : '');
  }

  function changePriceDependingOnHousing() {
    var params = {'min': '', 'placeholder': ''};
    params.min = minPrices[typeOfHousing.value];
    params.placeholder = 'от ' + params.min + ' до ' + price.max;
    setAttributes(price, params);
    validatePrice();
  }

  function changeTimeHandler(event) {
    timeIn.value = event.target.value;
    timeOut.value = event.target.value;
  }

  function validateCapacity() {
    var capacityInt = parseInt(capacity.value, 10);
    var label = 'Введено неверное значение! Для ';
    var condition;

    switch (parseInt(numberRoom.value, 10)) {
      case 1:
        condition = capacityInt !== 1;
        label += '1 комнаты возможное количество мест: "для 1 гостя"';
        break;
      case 2:
        condition = capacityInt !== 1 && capacityInt !== 2;
        label += '2 комнаты возможное количество мест: "для 1 гостя" или "для 2 гостей"';
        break;
      case 3:
        condition = capacityInt === 0;
        label += '3 комнат невозможно выбрать: "не для гостей"';
        break;
      case 100:
        condition = capacityInt !== 0;
        label += '100 комнат возможно выбрать только: "не для гостей"';
        break;
    }
    capacity.setCustomValidity(condition ? label : '');
  }

  function validatePriceHandler() {
    priceInt = parseInt(price.value, 10);
    validatePrice();
  }

  function validateCapacityHandler() {
    validateCapacity();
  }

  function changePriceDependingOnHousingHandler() {
    changePriceDependingOnHousing();
  }

  function resetForm() {
    resetBtnClickCallback();
  }

  typeOfHousing.addEventListener('change', changePriceDependingOnHousingHandler);
  price.addEventListener('change', validatePriceHandler);
  timeIn.addEventListener('change', changeTimeHandler);
  timeOut.addEventListener('change', changeTimeHandler);
  numberRoom.addEventListener('change', validateCapacityHandler);
  capacity.addEventListener('change', validateCapacityHandler);

  formAd.addEventListener('submit', function (event) {
    event.preventDefault();
    submitBtnClickCallback();
  });

  drop.addEventListener('click', resetForm);

  window.form = {
    setAddress: function (coords) {
      fieldAddress.value = coords.x + ', ' + coords.y;
    },

    changeStatus: function () {
      formAd.classList.toggle('ad-form--disabled');
      window.general.switchDisabledField(formAd);
      priceInt = 0;
      validateCapacity();
      validatePrice();
      changePriceDependingOnHousing();
    },

    resetForm: function () {
      formAd.reset();
    },

    setSubmitBtnClickCallback: function (callback) {
      submitBtnClickCallback = callback;
    },

    setResetBtnClickCallback: function (callback) {
      resetBtnClickCallback = callback;
    },

    getFormData: function () {
      return new FormData(formAd);
    }
  };
})();
