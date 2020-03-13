'use strict';

(function () {

  /*
    module for generate random offer data
  */
  var OFFERS_LIMIT = 5;
  var FILTER_HOUSE_TYPE = 'housing-type';
  var FILTER_HOUSE_PRICE = 'housing-price';
  var FILTER_HOUSE_ROOM = 'housing-rooms';
  var FILTER_HOUSE_GUEST = 'housing-guests';
  var FILTER_HOUSE_FEATURES = 'features';
  var FILTER_PRICE_LOW = 10000;
  var FILTER_PRICE_MIDDLE = 50000;

  var filterForm = document.querySelector('form.map__filters');
  filterForm.addEventListener('change', window.util.debounce(updateFilter));

  function updateFilter() {
    // remove card popup
    window.card.remove();
    // все объявления
    var data = window.data.offers;
    // все параметры формы
    var params = new FormData(document.querySelector('form.map__filters'));

    var filteredData = data.filter(function (offer) {
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
              matchParams -= (offer.offer.price < FILTER_PRICE_LOW) ? 0 : 1;
            }
            if (val === 'middle') {
              matchParams -= (offer.offer.price >= FILTER_PRICE_LOW && offer.offer.price <= FILTER_PRICE_MIDDLE) ? 0 : 1;
            }
            if (val === 'high') {
              matchParams -= (offer.offer.price > FILTER_PRICE_MIDDLE) ? 0 : 1;
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
  }

  window.data = {
    offers: [],
    filteredOffers: [],
    updateFilter: updateFilter
  };

})();
