var app = angular.module('app', []);

app.controller('ctrl', ['$scope', function ($scope) { }]);

app.directive('tgFixedButtons', [function () {

  return {
    restrict: 'E',
    link: function (scope, elem) {

      scope.fn = {
        getScrollParent: function (node) {
          if (node === null) {
            return null;
          } else if (node.scrollHeight > node.clientHeight) {
            return node;
          } else {
            return scope.fn.getScrollParent(node.parentNode);
          }
        },

        getOffset: function (elem) {
          let scroll = elem.getBoundingClientRect();
          return {
            left: scroll.left + $window.scrollX,
            top: scroll.top + $window.scrollY
          }
        },

        setActionButtons: function (elem, objController, scrollHeight) {
          if (objController.getBoundingClientRect().top > scrollHeight) {
            elem.classList.add('fixed-bottom');
          } else {
            elem.classList.remove('fixed-bottom');
          }
        },

        objController: function () {
          let div = document.createElement('div');
          div.id = 'objControllerFixedBtn';
          div.style.visibility = 'hidden';
          return div;
        },

        init: function () {

          scope.elem = elem[0];
          scope.objController = scope.fn.objController();
          scope.elem.parentNode.insertBefore(scope.objController, scope.elem);

          scope.actions = function (scroll, height) {
            angular.element(scroll).on('scroll', function () {
              scope.fn.setActionButtons(scope.elem, scope.objController, height);
            });
            scope.fn.setActionButtons(scope.elem, scope.objController, height);
          }

          if (scope.fn.getScrollParent(scope.elem).tagName == 'HTML') {
            scope.actions(window, window.innerHeight);

            angular.element(window).on('resize', function () {
              scope.fn.setActionButtons(scope.elem, scope.objController, window.innerHeight);
            });
          } else {
            scope.actions(scope.fn.getScrollParent(scope.elem).clientHeight, scope.fn.getScrollParent(scope.elem).clientHeight.clientHeight);

            angular.element(window).on('resize', function () {
              scope.fn.setActionButtons(scope.elem, scope.objController, scope.fn.getScrollParent(scope.elem).clientHeight);
            });
          }

        }
      }

      scope.fn.init();

    }
  }

}]);
