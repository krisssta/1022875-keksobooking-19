'use strict';

(function () {

  /*
    module for generate random offer data
  */

  var PIN_WIDTH = window.const.PIN_WIDTH;
  var OFFERS_LIMIT = 5;
  var FILTER_HOUSE_TYPE     = 'housing-type';
  var FILTER_HOUSE_PRICE    = 'housing-price';
  var FILTER_HOUSE_ROOM     = 'housing-rooms';
  var FILTER_HOUSE_GUEST    = 'housing-guests';
  var FILTER_HOUSE_FEATURES = 'features';

  var mapElemWidth = window.const.mapElemWidth;
  var filterForm = document.querySelector('form.map__filters');
  filterForm.addEventListener('change', window.util.debounce(updateFilter));

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

  function generateArrayObject() {
    var myObjectArray = [];
    for (var i = 1; i <= 8; i++) {
      var obj = generateObject(i);
      myObjectArray.push(obj);
    }

    return myObjectArray;
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

  function updateFilter() {
    // remove card popup
    window.card.remove()
    // все объявления
    var data = window.data.offers;
    // все параметры формы
    var params = new FormData(document.querySelector('form.map__filters'));

    var filteredData = data.filter(function(offer, index) {
      var matchParams = 0;

      // проверяем каждый параметр
      params.forEach(function (val, key) {
        switch (key) {
          case FILTER_HOUSE_TYPE:
            if (val !== 'any') {
              matchParams -= (offer.offer.type === val) ? 0 : 1;
            }
            break;

          case FILTER_HOUSE_PRICE:
            if (val === 'low') {
              matchParams -= (offer.offer.price < 10000) ? 0 : 1;
            }
            if (val === 'middle') {
              matchParams -= (offer.offer.price > 10000 && offer.offer.price < 50000) ? 0 : 1;
            }
            if (val === 'high') {
              matchParams -= (offer.offer.price > 50000) ? 0 : 1;
            }
            break;

          case FILTER_HOUSE_ROOM:
            if (val !== 'any') {
              matchParams -= (offer.offer.rooms === Number(val)) ? 0 : 1;
            }
            break;

          case FILTER_HOUSE_GUEST:
            if (val !== 'any') {
              matchParams -= (offer.offer.guests === Number(val)) ? 0 : 1;
            }
            break;

          case FILTER_HOUSE_FEATURES:
            matchParams -= (offer.offer.features.indexOf(val) > -1) ? 0 : 1;
            break;

          default:
            break;
        }
      });

      return matchParams === 0;
    });

    var filteredOffers = filteredData.slice(0, OFFERS_LIMIT);
    window.data.filteredOffers = filteredOffers;
    window.render(filteredOffers);
  };

  window.data = {
    offers: [],
    filteredOffers: [],
    updateFilter: updateFilter
  };

})();
