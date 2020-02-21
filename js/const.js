'use strict';

(function () {
  var mapPinMainSelector = '.map__pin--main';
  var mapPinMainElement = document.querySelector(mapPinMainSelector);
  var mapElem = document.querySelector('.map');
  var mapElemWidth = mapElem.offsetWidth;

  window.const = {
    'KEY_ENTER': 'Enter',
    'PIN_WIDTH': 50,
    'PIN_HEIGHT': 70,
    'PIN_MAIN_OFFSET_X': 570,
    'PIN_MAIN_OFFSET_Y': 375,
    'PIN_MAIN_WIDTH': mapPinMainElement.offsetWidth,
    'PIN_MAIN_HEIGHT': mapPinMainElement.offsetHeight,
    'PIN_MAIN_CORNER_HEIGHT': 22,
    'mapElem': mapElem,
    'mapElemWidth': mapElemWidth,
    'mapPinMainSelector': mapPinMainSelector,
    'mapPinMainElement': mapPinMainElement
  };
})();
