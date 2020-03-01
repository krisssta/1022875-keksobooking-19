'use strict';

(function () {

  // var offers = window.data.offers;
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  // generate map pins elements from offers
  var successHandler = function (offers) {

    for (var i = 0; i < offers.length; i++) {
      var pinElement = window.pin.createPin(offers[i], i);
      fragment.appendChild(pinElement);
    }

    mapPins.appendChild(fragment);
    // create card element for current offer & render it in map
    var cardElement = window.card.createCard(offers[0]);
    map.appendChild(cardElement);

    // set new offers
    window.data.offers = offers;
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

  // обработчики нажатия на Pin мышкой и с клавиатуры
  mapPins.addEventListener('mousedown', changeCard)
  mapPins.addEventListener('keydown', pressPinButton)

  function clickPinButton(e) {
    changeCard(e);
  }

  function pressPinButton(e) {
    if (e.key === window.const.KEY_ENTER) {
      changeCard(e);
    }
  }

  function changeCard(evt) {
    // если нажали на картинку - нужно взять родительский элемент button
    if (evt.target.tagName === 'IMG') {
      var currentPin = evt.target.parentNode;
    }

    if (evt.target.tagName === 'BUTTON') {
      var currentPin = evt.target;
    }

    if (currentPin && !currentPin.classList.contains('map__pin--main')) {
      // извлекаем дата атрибут index - чтобы узнать какое объявление отображать
      var index = currentPin.dataset.index
      var cardElement = window.card.createCard(window.data.offers[index]);
      map.appendChild(cardElement);
    }
  }

})();


