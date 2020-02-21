'use strict';

(function () {

  var offers = window.data.offers;
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  // generate map pins elements from offers
  for (var i = 0; i < offers.length; i++) {
    var pinElement = window.pin.createPin(offers[i]);
    fragment.appendChild(pinElement);
  }

  // paste map pins to map
  mapPins.appendChild(fragment);

  // create card element for current offer & render it in map
  var cardElement = window.card.createCard(offers[0]);
  map.appendChild(cardElement);

})();
