'use strict';

(function () {

  var mapElem = window.consts.mapElem;
  var mapPinMainElement = window.consts.mapPinMainElement;
  var PIN_MAIN_WIDTH = window.consts.PIN_MAIN_WIDTH;
  var PIN_MAIN_HEIGHT = window.consts.PIN_MAIN_HEIGHT;
  var PIN_MAIN_OFFSET_X = window.consts.PIN_MAIN_OFFSET_X;
  var PIN_MAIN_OFFSET_Y = window.consts.PIN_MAIN_OFFSET_Y;

  // image preview consts
  var AVATAR_IMG_WIDTH = 44;
  var AVATAR_IMG_HEIGHT = 44;
  var OFFER_IMG_WIDTH = 70;
  var OFFER_IMG_HEIGHT = 70;

  // form consts
  var BUNGALO_PRICE_MIN = 0;
  var FLAT_PRICE_MIN = 1000;
  var HOUST_PRICE_MIN = 5000;
  var PALACE_PRICE_MIN = 0;

  var main = document.querySelector('main');
  var success = document.querySelector('#success').content;
  var error = document.querySelector('#error').content;

  var adForm = main.querySelector('form.ad-form');
  var mapFilters = main.querySelectorAll('form.map__filters > input, form.map__filters > select, form.map__filters > fieldset');

  var fieldsets = adForm.querySelectorAll('fieldset');
  var timeInElement = adForm.querySelector('#timein');
  var timeOutElement = adForm.querySelector('#timeout');
  var houseTypeElement = adForm.querySelector('#type');
  var priceElement = adForm.querySelector('#price');
  var avatarFileInput = adForm.querySelector('#avatar');
  var offerFileInput = adForm.querySelector('#images');
  var avatarPreviewContainer = adForm.querySelector('.ad-form-header__preview');
  var offerPreviewContainer = adForm.querySelector('.ad-form__photo');

  offerFileInput.addEventListener('change', function (evt) {
    pasteImage(evt, offerPreviewContainer, OFFER_IMG_WIDTH, OFFER_IMG_HEIGHT);
  });
  avatarFileInput.addEventListener('change', function (evt) {
    pasteImage(evt, avatarPreviewContainer, AVATAR_IMG_WIDTH, AVATAR_IMG_HEIGHT);
  });

  function pasteImage(evt, container, width, height) {
    var fileReader = new FileReader();

    fileReader.readAsDataURL(evt.target.files[0]);
    fileReader.onload = function (fileReaderEvent) {
      var img = new Image();
      img.src = fileReaderEvent.target.result;
      img.width = width;
      img.height = height;
      container.innerHTML = '';
      container.appendChild(img);
    };
  }

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
        priceElement.min = BUNGALO_PRICE_MIN;
        priceElement.placeholder = BUNGALO_PRICE_MIN;
        break;
      case 'flat':
        priceElement.min = FLAT_PRICE_MIN;
        priceElement.placeholder = FLAT_PRICE_MIN;
        break;
      case 'house':
        priceElement.min = HOUST_PRICE_MIN;
        priceElement.placeholder = HOUST_PRICE_MIN;
        break;
      case 'palace':
        priceElement.min = PALACE_PRICE_MIN;
        priceElement.placeholder = PALACE_PRICE_MIN;
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
    window.util.isEnterEvent(evt, activateMapAndForm);
  }

  function activateMapAndForm() {
    changeNodeListDisable(fieldsets, false);
    changeNodeListDisable(mapFilters, false);

    adForm.classList.remove('ad-form--disabled');
    mapElem.classList.remove('map--faded');
    mapPinMainElement.removeEventListener('mousedown', clickPinMainButton, false);
    mapPinMainElement.removeEventListener('keydown', pressPinMainButton, false);

    window.load(successLoadDataHandler, errorLoadDataHandler);
  }

  function desactivateMapAndForm() {
    changeNodeListDisable(fieldsets, true);
    changeNodeListDisable(mapFilters, true);

    adForm.classList.add('ad-form--disabled');
    mapElem.classList.add('map--faded');
    mapPinMainElement.addEventListener('mousedown', clickPinMainButton);
    mapPinMainElement.addEventListener('keydown', pressPinMainButton);
    offerPreviewContainer.innerHTML = '';
    avatarPreviewContainer.innerHTML = '';

    window.pin.remove();
    window.card.remove();
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
  //  ошибка отправки объявления
  function errorHandler() {
    main.appendChild(error.cloneNode(true));
    var errorButton = main.querySelector('.error__button');
    document.addEventListener('click', closePopupError);
    errorButton.addEventListener('click', closePopupError);
    document.addEventListener('keydown', closePopupByKeyDownError);
  }

  //  успешная отправка объявления
  function successSaveHandler() {
    desactivateMapAndForm();
    main.appendChild(success.cloneNode(true));
    adForm.reset();
    document.addEventListener('click', closePopup);
    document.addEventListener('keydown', closePopupByKeyDown);
  }

  function successLoadDataHandler(data) {
    // set new offers - нужно перенести в data?
    window.data.offers = data;
    window.data.updateFilter();
  }

  function errorLoadDataHandler(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.save(new FormData(adForm), successSaveHandler, errorHandler);
  });

  //  закрытие попапа успешной отправки
  function closePopup() {
    var successA = main.querySelector('.success');
    successA.remove();
    document.removeEventListener('click', closePopup, false);
    document.removeEventListener('keydown', closePopupByKeyDown, false);
  }

  function closePopupByKeyDown(evt) {
    window.util.isEscEvent(evt, closePopup);
  }

  //  закрытие попапа неуспешной отправки
  function closePopupError() {
    var errorA = main.querySelector('.error');
    errorA.remove();
    document.removeEventListener('click', closePopupError, false);
    document.removeEventListener('keydown', closePopupByKeyDownError, false);
  }

  function closePopupByKeyDownError(evt) {
    window.util.isEscEvent(evt, closePopupError);
  }

})();
