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

          // console.log(elem, 'position top ' + objController.getBoundingClientRect().top, 'scroll height ' + scrollHeight);

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

          if (scope.fn.getScrollParent(scope.elem).tagName == 'HTML') {
            angular.element(window).on('scroll', function () {
              scope.fn.setActionButtons(scope.elem, scope.objController, window.innerHeight);
            });
            angular.element(window).on('resize', function () {
              scope.fn.setActionButtons(scope.elem, scope.objController, window.innerHeight);
            });
            scope.fn.setActionButtons(scope.elem, scope.objController, window.innerHeight);
          } else {
            angular.element(scope.fn.getScrollParent(scope.elem)).on('scroll', function () {
              scope.fn.setActionButtons(scope.elem, scope.objController, scope.fn.getScrollParent(scope.elem).clientHeight);
            });
            angular.element(window).on('resize', function () {
              scope.fn.setActionButtons(scope.elem, scope.objController, scope.fn.getScrollParent(scope.elem).clientHeight);
            });
            scope.fn.setActionButtons(scope.elem, scope.objController, scope.fn.getScrollParent(scope.elem).clientHeight);
          }

        }
      }

      scope.fn.init();

    }
  }

}]);
