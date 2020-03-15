'use strict';

(function () {

  var card = document.querySelector('#card')
      .content
      .querySelector('.map__card');

  var features = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

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

    var cardElement = card.cloneNode(true);
    var cardAvatar = cardElement.querySelector('.popup__avatar');
    var cardPrice = cardElement.querySelector('.popup__text--price');
    var cardAddress = cardElement.querySelector('.popup__text--address');
    var cardCapacity = cardElement.querySelector('.popup__text--capacity');
    var cardTime = cardElement.querySelector('.popup__text--time');
    var cardFeatures = cardElement.querySelector('.popup__features');
    var closePopupButton = cardElement.querySelector('.popup__close');

    // close active card by press Esc and click to close button
    document.addEventListener('keydown', closePopupByKeydown);
    closePopupButton.addEventListener('click', closePopup);

    function closePopup() {
      cardElement.classList.add('hidden');
      closePopupButton.removeEventListener('click', closePopup);
      document.removeEventListener('keydown', closePopupByKeydown);
    }

    function closePopupByKeydown(evt) {
      window.util.isEscEvent(evt, closePopup);
    }

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

    return cardElement;
  };

})();
