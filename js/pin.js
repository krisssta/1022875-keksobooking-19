'use strict';

(function () {

  /*
    module create pin element
  */

  var PIN_WIDTH = window.const.PIN_WIDTH;
  var PIN_HEIGHT = window.const.PIN_HEIGHT;
  var map = document.querySelector('.map');
  var pin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  window.pin.remove = function () {
    var mapPins = map.querySelectorAll('.map__pin');
    [].map.call(mapPins, function (it) {
      if (!it.classList.contains('map__pin--main')) {
        it.remove();
      }
    });
  };

  window.pin.createPin = function (offer, index) {
    var objectElement = pin.cloneNode(true);
    var elementImg = objectElement.querySelector('img');
    elementImg.setAttribute('src', offer.author.avatar);
    elementImg.setAttribute('alt', offer.offer.title);
    objectElement.setAttribute('style', 'left:' + (offer.location.x - PIN_WIDTH / 2) + 'px; top:' + (offer.location.y - PIN_HEIGHT) + 'px');
    objectElement.setAttribute('data-index', index);

    return objectElement;
  };

})();
