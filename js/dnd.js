'use strict';

(function () {
  var DND_ELEMENT_OFFSET_X = window.consts.PIN_MAIN_WIDTH / 2;
  var DND_ELEMENT_OFFSET_Y = window.consts.PIN_MAIN_HEIGHT;
  var MIN_OFFER_COORD_X = 0;
  var MAX_OFFER_COORD_X = window.consts.mapElemWidth;
  var MIN_OFFER_COORD_Y = 130;
  var MAX_OFFER_COORD_Y = 630;

  // вычисляем мин, макс значение верхнего левого угла передвигаемого элемента (main pin)
  var MIN_COORD_X = Math.round(MIN_OFFER_COORD_X - DND_ELEMENT_OFFSET_X);
  var MAX_COORD_X = Math.round(MAX_OFFER_COORD_X - DND_ELEMENT_OFFSET_X);
  var MIN_COORD_Y = Math.round(MIN_OFFER_COORD_Y - DND_ELEMENT_OFFSET_Y);
  var MAX_COORD_Y = Math.round(MAX_OFFER_COORD_Y - DND_ELEMENT_OFFSET_Y);

  var dndElement = window.consts.mapPinMainElement;

  var Coordinate = function (x, y) {
    this.x = x;
    this.y = y;
  };

  var EventDetailCoords = function (x, y) {
    this.detail = {
      coords: {
        'x': x,
        'y': y
      }
    };
  };

  // функция перемещиния элемента из одной точки в другую
  function moveElement(element, from, to) {
    var shift = {
      x: from.x - to.x,
      y: from.y - to.y,
    };

    var elementCornerTop = element.offsetTop - shift.y;
    var elementCornerLeft = element.offsetLeft - shift.x;

    // проверяем выход за границы карты
    if (elementCornerTop < MIN_COORD_Y) {
      elementCornerTop = MIN_COORD_Y;
    }
    if (elementCornerTop > MAX_COORD_Y) {
      elementCornerTop = MAX_COORD_Y;
    }
    if (elementCornerLeft < MIN_COORD_X) {
      elementCornerLeft = MIN_COORD_X;
    }
    if (elementCornerLeft > MAX_COORD_X) {
      elementCornerLeft = MAX_COORD_X;
    }

    element.style.top = elementCornerTop + 'px';
    element.style.left = elementCornerLeft + 'px';

    // генерируем кастомное событие, по которому будет меняться адрес в форме
    dndElement.dispatchEvent(new CustomEvent('dnd.pin-moved', new EventDetailCoords(elementCornerLeft, elementCornerTop)));
  }

  dndElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // координаты в момент первого события mousedown - нужны, если просто кликнули, без перемещения
    var defaultDndCoords = new Coordinate(dndElement.offsetLeft, dndElement.offsetTop);
    var startCoords = new Coordinate(evt.clientX, evt.clientY);
    var dragged = false;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var newCoords = new Coordinate(moveEvt.clientX, moveEvt.clientY);
      moveElement(dndElement, startCoords, newCoords);
      startCoords = newCoords;
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      // если перемещения не было, все равно меняем адрес (по клику)
      if (!dragged) {
        // если страница прокручена, то нужно добавить пиксели к новой координате
        startCoords.x += window.pageXOffset;
        startCoords.y += window.pageYOffset;

        moveElement(dndElement, defaultDndCoords, startCoords);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
