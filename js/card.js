'use strict';

(function () {

  var closePopup = function () {
    var activeCard = document.querySelector('.map__card.popup');
    activeCard.classList.add('hidden');
  };

  // close active card by press Esc
  document.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, closePopup);
  });

  /*
    create card offer, validate data
  */

  window.card.createCard = function (offer) {
    // remove current card
    var activeCard = document.querySelector('.map__card.popup');
    if (activeCard !== null) {
      activeCard.remove();
    }

    var card = document.querySelector('#card')
      .content
      .querySelector('.map__card');

    var cardElement = card.cloneNode(true);

    var typesRus = {
      palace: 'дворец',
      flat: 'квартира',
      house: 'дом',
      bungalo: 'бунгало'
    };

    renderCardContent('.popup__avatar', offer.author.avatar, 'img');
    renderCardContent('.popup__title', offer.offer.title, 'text');
    renderCardContent('.popup__text--address', offer.offer.address, 'text');
    renderCardContent('.popup__type', typesRus[offer.offer.type], 'text');
    renderCardContent('.popup__features', offer.offer.features, 'text');
    renderCardContent('.popup__description', offer.offer.description, 'text');

    if (offer.offer.price) {
      cardElement.querySelector('.popup__text--price').innerHTML = offer.offer.price + ' &#8381' + '/ночь';
    } else {
      cardElement.querySelector('.popup__text--price').classList.add('hidden');
    }
    if (offer.offer.rooms && offer.offer.guests) {
      cardElement.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнат(а)(ы) для ' + offer.offer.guests + ' гостей';
    } else {
      cardElement.querySelector('.popup__text--capacity').classList.add('hidden');
    }
    if (offer.offer.checkin && offer.offer.checkout) {
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
    } else {
      cardElement.querySelector('.popup__text--time').classList.add('hidden');
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

    function renderCardContent(selector, content, type) {
      if (!content) {
        cardElement.querySelector(selector).classList.add('hidden');
      } else {
        if (type === 'text') {
          cardElement.querySelector(selector).textContent = content;
        }
        if (type === 'html') {
          cardElement.querySelector(selector).innerHTML = content;
        }
        if (type === 'img') {
          cardElement.querySelector(selector).setAttribute('src', content);
        }
      }
    }

    var closePopupButton = cardElement.querySelector('.popup__close');
    closePopupButton.addEventListener('click', closePopup);

    return cardElement;
  };

})();
