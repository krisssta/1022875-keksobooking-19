'use strict';

(function () {
  function validateRoomNumber() {
    var roomElement = document.querySelector('#room_number');
    var capacityElement = document.querySelector('#capacity');
    var roomChecked = roomElement.value;
    var capacityChecked = capacityElement.value;

    console.log('validateRoomNumber', roomChecked, capacityChecked)
    if (roomChecked === '100' && capacityChecked !== '0') {
      capacityElement.setCustomValidity('При выборе 100 комнат количество мест должно быть "не для гостей"');
    } else if (roomChecked !== '100' && capacityChecked === '0') {
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

    console.log('validatePrice', houseType, price)

    if (houseType === 'flat' && price < 1000) {
      priceElement.setCustomValidity('Минимальная цена для квартиры - 1 000');
    } else if (houseType === 'house' && price < 5000) {
      priceElement.setCustomValidity('Минимальная цена для дома - 5 000');
    } else if (houseType === 'palace' && price < 10000) {
      priceElement.setCustomValidity('Минимальная цена для дворца - 10 000');
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
  }
})();

