'use strict';

(function () {

  // var offers = window.data.offers;
  var map = document.querySelector('.map');
  var mapPinsContainer = document.querySelector('.map__pins');
  
  var fragment = document.createDocumentFragment();

  // generate map pins elements from offers
  window.render = function (data) {
    // удаляем все текущие пины
    var mapPins = map.querySelectorAll('.map__pin');
    [].map.call(mapPins, function (it) {
      if (! it.classList.contains('map__pin--main')) {
        it.remove();
      }
    })

    // вставляем нужные пины
    for (var i = 0; i < data.length; i++) {
      var pinElement = window.pin.createPin(data[i], i);
      fragment.appendChild(pinElement);
    }

    mapPinsContainer.appendChild(fragment);
  }

  // обработчики нажатия на Pin мышкой и с клавиатуры
  mapPinsContainer.addEventListener('mousedown', clickPinButton);
  mapPinsContainer.addEventListener('keydown', pressPinButton);

  function clickPinButton(e) {
    changeCard(e);
  }

  function pressPinButton(e) {
    if (e.key === window.const.KEY_ENTER) {
      changeCard(e);
    }
  }

  function changeCard(evt) {
    var currentPin = null;

    // если нажали на картинку - нужно взять родительский элемент button
    if (evt.target.tagName === 'IMG') {
      currentPin = evt.target.parentNode;
    }

    if (evt.target.tagName === 'BUTTON') {
      currentPin = evt.target;
    }

    if (currentPin && !currentPin.classList.contains('map__pin--main')) {
      // извлекаем дата атрибут index - чтобы узнать какое объявление отображать
      var index = currentPin.dataset.index;
      var cardElement = window.card.createCard(window.data.filteredOffers[index]);
      map.appendChild(cardElement);
    }
  }

})();


