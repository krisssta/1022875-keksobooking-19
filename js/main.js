'use strict';
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var mapElem = document.querySelector('.map');
var mapElemWidth = mapElem.offsetWidth;

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
var mapPins = document.querySelector('.map__pins');
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

mapPins.appendChild(fragment);

mapElem.classList.remove('map--faded');

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
cardElement.querySelector('.popup__avatar').setAttribute('src', offers[0].author.avatar);
cardElement.querySelector('.popup__title').textContent = offers[0].offer.title;
cardElement.querySelector('.popup__text--address').textContent = offers[0].offer.address;
cardElement.querySelector('.popup__text--price').innerHTML = offers[0].offer.price + ' &#8381' + '/ночь';
cardElement.querySelector('.popup__type').textContent = typesRus[offers[0].offer.type];
cardElement.querySelector('.popup__text--capacity').textContent = offers[0].offer.rooms + ' комнат(а)(ы) для ' + offers[0].offer.guests + ' гостей';
cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offers[0].offer.checkin + ', выезд до ' + offers[0].offer.checkout;
cardElement.querySelector('.popup__features').textContent = offers[0].offer.features;
cardElement.querySelector('.popup__description').textContent = offers[0].offer.description;

var popupPhoto = cardElement.querySelector('.popup__photo');
for (var j = 0; j < offers[0].offer.photos.length; j++) {
  var photo = popupPhoto.cloneNode(true);
  photo.setAttribute('src', offers[0].offer.photos[j]);
  cardElement.querySelector('.popup__photos').appendChild(photo);
}
popupPhoto.remove();

var map = document.querySelector('.map');
map.appendChild(cardElement);

