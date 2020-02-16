'use strict';
var mapPinMainSelector = '.map__pin--main';
var mapPinMainElement = document.querySelector(mapPinMainSelector);

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var PIN_MAIN_OFFSET_X = 570;
var PIN_MAIN_OFFSET_Y = 375;
var PIN_MAIN_WIDTH = mapPinMainElement.offsetWidth;
var PIN_MAIN_HEIGHT = mapPinMainElement.offsetHeight;
var PIN_MAIN_CORNER_HEIGHT = 22;

var KEY_ENTER = 'Enter';
var mapElem = document.querySelector('.map');
var mapElemWidth = mapElem.offsetWidth;

var adForm = document.querySelector('form.ad-form');
var fieldsets = document.querySelectorAll('form.ad-form > fieldset');
var mapFilters = document.querySelectorAll('form.map__filters > input, form.map__filters > select, form.map__filters > fieldset');

adForm.addEventListener('change', validateRoomNumber);

changeNodeListDisable(fieldsets, true);
changeNodeListDisable(mapFilters, true);

mapPinMainElement.addEventListener('mousedown', clickPinMainButton);
mapPinMainElement.addEventListener('keydown', pressPinMainButton);

var inputAddressElement = document.querySelector('#address');
inputAddressElement.value = Math.round((PIN_MAIN_OFFSET_X + PIN_MAIN_WIDTH / 2)) + ', ' + Math.round((PIN_MAIN_OFFSET_Y + PIN_MAIN_HEIGHT / 2));

function validateRoomNumber() {
  var roomElement = document.querySelector('#room_number');
  var capacityElement = document.querySelector('#capacity');
  var roomChecked = roomElement.value;
  var capacityChecked = capacityElement.value;

  if (roomChecked === '100' && capacityChecked !== '0') {
    capacityElement.setCustomValidity('При выборе 100 комнат количество мест должно быть "не для гостей"');
  } else if (roomChecked !== '100' && capacityChecked === '0') {
    capacityElement.setCustomValidity('Количество мест "не для гостей" только для варианта количества комнат "100 комнат"');
  } else if (roomChecked < capacityChecked) {
    capacityElement.setCustomValidity('Количество гостей не должно превышать количества комнат');
  } else {
    capacityElement.setCustomValidity('')
  }
}

validateRoomNumber();

function clickPinMainButton(e) {
  if (typeof e === 'object') {
    switch (e.button) {
      case 0:
        activateMapAndForm();
        break;
      default:
        break;
    }
  }
}

function pressPinMainButton(evt) {
  if (evt.key === KEY_ENTER) {
    activateMapAndForm();
  }
}

function activateMapAndForm() {
  changeNodeListDisable(fieldsets, false);
  changeNodeListDisable(mapFilters, false);
  inputAddressElement.value = Math.round((PIN_MAIN_OFFSET_X + PIN_MAIN_WIDTH / 2)) + ', ' + Math.round((PIN_MAIN_OFFSET_Y + PIN_MAIN_WIDTH + PIN_MAIN_CORNER_HEIGHT));
  adForm.classList.remove('ad-form--disabled');
  mapElem.classList.remove('map--faded');
  mapPinMainElement.removeEventListener('mousedown', clickPinMainButton, false);
  mapPinMainElement.removeEventListener('keydown', pressPinMainButton, false);
}

function changeNodeListDisable(list, status) {
  for (var i = 0; i < list.length; i++) {
    if (status === true) {
      list[i].setAttribute('disabled', true);
    } else {
      list[i].removeAttribute('disabled');
    }
  }
}

function generateArrayObject() {
  var myObjectArray = [];
  for (var i = 1; i <= 8; i++) {
    var obj = generateObject(i);
    myObjectArray.push(obj);
  }

  return myObjectArray;
}

function generateRandomCount(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

function generateRandomArray(arr, count) {
  var resultArray = [];
  for (var i = 0; i < count; i++) {
    var randIndex = generateRandomCount(0, arr.length - 1);
    resultArray.push(arr[randIndex]);
    arr.splice(randIndex, 1);
  }

  return resultArray;
}

function generateObject() {
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var checkin = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photos = ['http:o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var location = {
    'x': generateRandomCount(PIN_WIDTH / 2, mapElemWidth - PIN_WIDTH / 2),
    'y': generateRandomCount(130, 630)
  };
  var randTypes = generateRandomCount(0, types.length - 1);
  var randCheckin = generateRandomCount(0, checkin.length - 1);
  var randPhotosCount = generateRandomCount(1, photos.length);
  var randFeaturesCount = generateRandomCount(1, features.length);
  var randPhotos = generateRandomArray(photos, randPhotosCount);
  var randFeatures = generateRandomArray(features, randFeaturesCount);

  return {
    'author': {
      'avatar': 'img/avatars/user0' + generateRandomCount(1, 8) + '.png',
    },
    'offer': {
      'title': 'Сдается за недорого Отличная хатка',
      'address': location.x + ',' + location.y,
      'price': generateRandomCount(2000, 10000),
      'type': types[randTypes],
      'rooms': generateRandomCount(1, 5),
      'guests': generateRandomCount(1, 5),
      'checkin': checkin[randCheckin],
      'checkout': checkin[randCheckin],
      'features': randFeatures,
      'description': 'сдаем на длительный срок',
      'photos': randPhotos
    },
    'location': {
      'x': location.x,
      'y': location.y
    }
  };
}

var offers = generateArrayObject();
// var mapPins = document.querySelector('.map__pins');
var pin = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var fragment = document.createDocumentFragment();

for (var i = 0; i < offers.length; i++) {
  var objectElement = pin.cloneNode(true);
  var elementImg = objectElement.querySelector('img');
  elementImg.setAttribute('src', offers[i].author.avatar);
  elementImg.setAttribute('alt', offers[i].offer.title);

  objectElement.setAttribute('style', 'left:' + (offers[i].location.x - PIN_WIDTH / 2) + 'px; top:' + (offers[i].location.y - PIN_HEIGHT) + 'px');
  fragment.appendChild(objectElement);
}

// mapPins.appendChild(fragment);

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

renderCardContent('.popup__avatar', offers[0].author.avatar, 'img');
renderCardContent('.popup__title', offers[0].offer.title, 'text');
renderCardContent('.popup__text--address', offers[0].offer.address, 'text');
renderCardContent('.popup__type', typesRus[offers[0].offer.type], 'text');
renderCardContent('.popup__features', offers[0].offer.features, 'text');
renderCardContent('.popup__description', offers[0].offer.description, 'text');

if (offers[0].offer.price) {
  cardElement.querySelector('.popup__text--price').innerHTML = offers[0].offer.price + ' &#8381' + '/ночь';
} else {
  cardElement.querySelector('.popup__text--price').classList.add('hidden');
}
if (offers[0].offer.rooms && offers[0].offer.guests) {
  cardElement.querySelector('.popup__text--capacity').textContent = offers[0].offer.rooms + ' комнат(а)(ы) для ' + offers[0].offer.guests + ' гостей';
} else {
  cardElement.querySelector('.popup__text--capacity').classList.add('hidden');
}
if (offers[0].offer.checkin && offers[0].offer.checkout) {
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offers[0].offer.checkin + ', выезд до ' + offers[0].offer.checkout;
} else {
  cardElement.querySelector('.popup__text--time').classList.add('hidden');
}

var popupPhoto = cardElement.querySelector('.popup__photo');
for (var j = 0; j < offers[0].offer.photos.length; j++) {
  var photo = popupPhoto.cloneNode(true);
  photo.setAttribute('src', offers[0].offer.photos[j]);
  cardElement.querySelector('.popup__photos').appendChild(photo);
}
popupPhoto.remove();

// var map = document.querySelector('.map');
// map.appendChild(cardElement);

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
