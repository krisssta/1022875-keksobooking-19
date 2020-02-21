'use strict';

(function () {

  var KEY_ENTER = window.const.KEY_ENTER;
  var mapElem = window.const.mapElem;
  var mapPinMainElement = window.const.mapPinMainElement;
  var PIN_MAIN_WIDTH = window.const.PIN_MAIN_WIDTH;
  var PIN_MAIN_HEIGHT = window.const.PIN_MAIN_HEIGHT;
  var PIN_MAIN_CORNER_HEIGHT = window.const.PIN_MAIN_CORNER_HEIGHT;
  var PIN_MAIN_OFFSET_X = window.const.PIN_MAIN_OFFSET_X;
  var PIN_MAIN_OFFSET_Y = window.const.PIN_MAIN_OFFSET_Y;

  var adForm = document.querySelector('form.ad-form');
  var fieldsets = document.querySelectorAll('form.ad-form > fieldset');
  var mapFilters = document.querySelectorAll('form.map__filters > input, form.map__filters > select, form.map__filters > fieldset');

  adForm.addEventListener('change', validateRoomNumber);

  changeNodeListDisable(fieldsets, true);
  changeNodeListDisable(mapFilters, true);

  mapPinMainElement.addEventListener('mousedown', clickPinMainButton);
  mapPinMainElement.addEventListener('keydown', pressPinMainButton);

  var inputAddressElement = document.querySelector('#address');
  inputAddressElement.value = Math.round((PIN_MAIN_OFFSET_X + PIN_MAIN_WIDTH / 2)) + ', ' + Math.round((PIN_MAIN_OFFSET_Y + PIN_MAIN_HEIGHT / 2));

  function validateRoomNumber() {
    var roomElement = document.querySelector('#room_number');
    var capacityElement = document.querySelector('#capacity');
    var roomChecked = roomElement.value;
    var capacityChecked = capacityElement.value;

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

  validateRoomNumber();

  function clickPinMainButton(e) {
    if (typeof e === 'object') {
      switch (e.button) {
        case 0:
          activateMapAndForm();
          break;
        default:
          break;
      }
    }
  }

  function pressPinMainButton(evt) {
    if (evt.key === KEY_ENTER) {
      activateMapAndForm();
    }
  }

  function activateMapAndForm() {
    changeNodeListDisable(fieldsets, false);
    changeNodeListDisable(mapFilters, false);
    inputAddressElement.value = Math.round((PIN_MAIN_OFFSET_X + PIN_MAIN_WIDTH / 2)) + ', ' + Math.round((PIN_MAIN_OFFSET_Y + PIN_MAIN_WIDTH + PIN_MAIN_CORNER_HEIGHT));
    adForm.classList.remove('ad-form--disabled');
    mapElem.classList.remove('map--faded');
    mapPinMainElement.removeEventListener('mousedown', clickPinMainButton, false);
    mapPinMainElement.removeEventListener('keydown', pressPinMainButton, false);
  }

  function changeNodeListDisable(list, status) {
    for (var i = 0; i < list.length; i++) {
      if (status === true) {
        list[i].setAttribute('disabled', true);
      } else {
        list[i].removeAttribute('disabled');
      }
    }
  }
})();
