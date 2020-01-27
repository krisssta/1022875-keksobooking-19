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
      'title': 'Сдается за недорого Отличная хатка_',
      'address': location.x + ',' + location.y,
      'price': generateRandomCount(1000000, 5000000) + ' рублей',
      'type': types[randTypes],
      'rooms': generateRandomCount(1, 5),
      'guests': generateRandomCount(1, 5) + ' человек',
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

