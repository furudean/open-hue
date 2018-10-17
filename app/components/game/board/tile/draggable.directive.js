angular.module('game')
  .directive('draggable', function($document, $timeout, $log) {
    function moveTo(elem, y, x) {
      elem.css({
        top: y + 'px',
        left: x + 'px',
      });
    }

    function link(scope, element, attrs) {
      const tile = scope.$ctrl.tile;
      let y0 = 0;
      let x0 = 0;
      let y = 0;
      let x = 0;
      let callback;

      if (tile.locked === true) {
        return;
      }

      element.on('mousedown', (event) => {
        event.preventDefault();

        $timeout.cancel(callback);

        y0 = event.screenY - y;
        x0 = event.screenX - x;

        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
        element.addClass('tile--lifted');
        element.css('zIndex', 2);
      });

      function mousemove(event) {
        y = event.screenY - y0;
        x = event.screenX - x0;

        moveTo(element, y, x);
      }

      function mouseup(event) {
        y0 = 0;
        x0 = 0;
        y = 0;
        x = 0;

        $log.info(event);

        element.removeClass('tile--lifted');
        $document.unbind('mousemove', mousemove);
        $document.unbind('mouseup', mouseup);
        element.css('zIndex', 1);
        moveTo(element, 0, 0);
        callback = $timeout(() => {
          element.css('zIndex', null);
        }, 250);
      }
    }

    return {
      restrict: 'A',
      link,
    };
  });
