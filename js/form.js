'use strict';

(function () {

  var KEY_ENTER = window.const.KEY_ENTER;
  var mapElem = window.const.mapElem;
  var mapPinMainElement = window.const.mapPinMainElement;
  var PIN_MAIN_WIDTH = window.const.PIN_MAIN_WIDTH;
  var PIN_MAIN_HEIGHT = window.const.PIN_MAIN_HEIGHT;
  var PIN_MAIN_OFFSET_X = window.const.PIN_MAIN_OFFSET_X;
  var PIN_MAIN_OFFSET_Y = window.const.PIN_MAIN_OFFSET_Y;

  var adForm = document.querySelector('form.ad-form');
  var fieldsets = document.querySelectorAll('form.ad-form > fieldset');
  var mapFilters = document.querySelectorAll('form.map__filters > input, form.map__filters > select, form.map__filters > fieldset');

  var timeInElement = document.querySelector('#timein');
  var timeOutElement = document.querySelector('#timeout');
  var houseTypeElement = document.querySelector('#type');
  var priceElement = document.querySelector('#price');

  // validation functions
  var validateForm = window.validation.validateForm;

  // change form
  adForm.addEventListener('change', validateForm);
  timeInElement.addEventListener('change', changeTimeIn);
  timeOutElement.addEventListener('change', changeTimeOut);
  houseTypeElement.addEventListener('change', changeHouseType);

  function changeTimeIn(evt) {
    timeOutElement.value = evt.target.value;
  }

  function changeTimeOut(evt) {
    timeInElement.value = evt.target.value;
  }

  function changeHouseType() {
    var houseType = houseTypeElement.value;
    switch (houseType) {
      case 'bungalo':
        priceElement.min = 0;
        priceElement.placeholder = 0;
        break;
      case 'flat':
        priceElement.min = 1000;
        priceElement.placeholder = 1000;
        break;
      case 'house':
        priceElement.min = 5000;
        priceElement.placeholder = 5000;
        break;
      case 'palace':
        priceElement.min = 10000;
        priceElement.placeholder = 10000;
        break;
      default:
        break;
    }
  }

  changeNodeListDisable(fieldsets, true);
  changeNodeListDisable(mapFilters, true);

  mapPinMainElement.addEventListener('mousedown', clickPinMainButton);
  mapPinMainElement.addEventListener('keydown', pressPinMainButton);

  // устанавливаем адрес по умолчанию
  var inputAddressElement = document.querySelector('#address');
  var defaultCoords = {
    x: PIN_MAIN_OFFSET_X,
    y: PIN_MAIN_OFFSET_Y
  };

  changePinAddress(defaultCoords);

  // меняем адрес при перетаскивании/клике на главную метку
  mapPinMainElement.addEventListener('dnd.pin-moved', function (event) {
    var coords = event.detail.coords;
    changePinAddress(coords);
  });

  function changePinAddress(coords) {
    inputAddressElement.value = Math.round((coords.x + PIN_MAIN_WIDTH / 2)) + ', ' + Math.round((coords.y + PIN_MAIN_HEIGHT));
  }

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
