'use strict';

(function () {

  // var offers = window.data.offers;
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  // generate map pins elements from offers
  var successHandler = function (pins) {

    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(window.pin.createPin(pins[i]));
    }

    mapPins.appendChild(fragment);
    // create card element for current offer & render it in map
    var cardElement = window.card.createCard(pins[0]);
    map.appendChild(cardElement);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(successHandler, errorHandler);

})();


