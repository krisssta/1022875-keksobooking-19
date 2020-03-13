'use strict';

(function () {

  var features = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  function closePopup() {
    var activeCard = document.querySelector('.map__card.popup');
    activeCard.classList.add('hidden');

    document.removeEventListener('keydown', closePopup);
  }

  /*
    remove card
  */
  window.card.remove = function () {
    // remove current card
    var activeCard = document.querySelector('.map__card.popup');
    if (activeCard !== null) {
      activeCard.remove();
    }
  };

  /*
    create card offer, validate data
  */
  window.card.createCard = function (offer) {
    // удаляем активное объявление
    window.card.remove();

    var card = document.querySelector('#card')
      .content
      .querySelector('.map__card');

    var cardElement = card.cloneNode(true);
    var cardAvatar = cardElement.querySelector('.popup__avatar');
    var cardPrice = cardElement.querySelector('.popup__text--price');
    var cardAddress = cardElement.querySelector('.popup__text--address');
    var cardCapacity = cardElement.querySelector('.popup__text--capacity');
    var cardTime = cardElement.querySelector('.popup__text--time');
    var cardFeatures = cardElement.querySelector('.popup__features');

    if (offer.author.avatar) {
      cardAvatar.setAttribute('src', offer.author.avatar);
    } else {
      window.util.hideElement(cardAvatar);
    }
    if (offer.offer.price) {
      cardPrice.textContent = offer.offer.price + ' ₽/ночь';
    } else {
      window.util.hideElement(cardPrice);
    }
    if (offer.offer.address) {
      cardAddress.textContent = offer.offer.address;
    } else {
      window.util.hideElement(cardAddress);
    }
    if (offer.offer.rooms && offer.offer.guests) {
      cardCapacity.textContent = offer.offer.rooms + ' комнат(а)(ы) для ' + offer.offer.guests + ' гостей';
    } else {
      window.util.hideElement(cardCapacity);
    }
    if (offer.offer.checkin && offer.offer.checkout) {
      cardTime.textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
    } else {
      window.util.hideElement(cardTime);
    }

    // проверка фич
    if (!offer.offer.features || offer.offer.features.length === 0) {
      window.util.hideElement(cardFeatures);
    } else {
      features.map(function (feature) {
        if (offer.offer.features.indexOf(feature) === -1) {
          cardElement.querySelector('.popup__feature--' + feature).remove();
        }
      });
    }

    var popupPhoto = cardElement.querySelector('.popup__photo');
    var popupPhotoContainer = cardElement.querySelector('.popup__photos');
    popupPhotoContainer.innerHTML = '';
    for (var j = 0; j < offer.offer.photos.length; j++) {
      var photo = popupPhoto.cloneNode(true);
      photo.setAttribute('src', offer.offer.photos[j]);
      popupPhotoContainer.appendChild(photo);
    }
    popupPhoto.remove();

    var closePopupButton = cardElement.querySelector('.popup__close');
    // close active card by press Esc
    document.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, closePopup);
    });
    closePopupButton.addEventListener('click', closePopup);

    return cardElement;
  };

})();
