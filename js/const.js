'use strict';

(function () {
  var mapPinMainSelector = '.map__pin--main';
  var mapPinMainElement = document.querySelector(mapPinMainSelector);
  var mapElem = document.querySelector('.map');
  var mapElemWidth = mapElem.offsetWidth;
  var mapElemHeight = mapElem.offsetHeight;

  window.const = {
    'KEY_ENTER': 'Enter',
    'PIN_WIDTH': 50,
    'PIN_HEIGHT': 70,
    'PIN_MAIN_WIDTH': 62,
    'PIN_MAIN_HEIGHT': 84,
    'PIN_MAIN_OFFSET_X': 570,
    'PIN_MAIN_OFFSET_Y': 375,
    'PIN_MAIN_CORNER_HEIGHT': 22,
    'mapElem': mapElem,
    'mapElemWidth': mapElemWidth,
    'mapElemHeight': mapElemHeight,
    'mapPinMainSelector': mapPinMainSelector,
    'mapPinMainElement': mapPinMainElement
  };
})();
