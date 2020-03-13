'use strict';

(function () {
  var MIN_FLAT_PRICE = 1000;
  var MIN_HOUSE_PRICE = 5000;
  var MIN_PALACE_PRICE = 10000;
  var MAX_ROOM_VALUE = '100';
  var NULL_CAPACITY_VALUE = '0';

  function validateRoomNumber() {
    var roomElement = document.querySelector('#room_number');
    var capacityElement = document.querySelector('#capacity');
    var roomChecked = roomElement.value;
    var capacityChecked = capacityElement.value;

    if (roomChecked === MAX_ROOM_VALUE && capacityChecked !== NULL_CAPACITY_VALUE) {
      capacityElement.setCustomValidity('При выборе 100 комнат количество мест должно быть "не для гостей"');
    } else if (roomChecked !== MAX_ROOM_VALUE && capacityChecked === NULL_CAPACITY_VALUE) {
      capacityElement.setCustomValidity('Количество мест "не для гостей" только для варианта количества комнат "100 комнат"');
    } else if (roomChecked < capacityChecked) {
      capacityElement.setCustomValidity('Количество гостей не должно превышать количества комнат');
    } else {
      capacityElement.setCustomValidity('');
    }
  }

  function validatePrice() {
    var houseTypeElement = document.querySelector('#type');
    var priceElement = document.querySelector('#price');
    var houseType = houseTypeElement.value;
    var price = priceElement.value;

    if (houseType === 'flat' && price < MIN_FLAT_PRICE) {
      priceElement.setCustomValidity('Минимальная цена для квартиры - ' + MIN_FLAT_PRICE);
    } else if (houseType === 'house' && price < MIN_HOUSE_PRICE) {
      priceElement.setCustomValidity('Минимальная цена для дома - ' + MIN_HOUSE_PRICE);
    } else if (houseType === 'palace' && price < MIN_PALACE_PRICE) {
      priceElement.setCustomValidity('Минимальная цена для дворца - ' + MIN_PALACE_PRICE);
    } else {
      priceElement.setCustomValidity('');
    }
  }

  function validateForm() {
    validateRoomNumber();
    validatePrice();
  }

  window.validation = {
    validateForm: validateForm
  };

})();

