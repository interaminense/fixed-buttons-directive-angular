var app = angular.module('app', []);

app.controller('ctrl', ['$scope', function ($scope) {
  // $scope.teste = function(){
  //   document.querySelector('.content-wrapper').style.display = 'block';
  // }
}]);

app.directive('tgFixedButtons', ['$window', '$document', function ($window, $document) {

  return {
    restrict: 'E',
    link: function (scope, elem) {

      scope.element = {
        self: elem[0],
        scroll: scope.element.getScrollParent(scope.element.self),
        scrollHeight: scope.element.getScrollParentHeight(scope.element.scroll),
        scrollOffset: scope.element.getOffset(scope.element.scroll),

        getScrollParentHeight: function (scroll) {
          return scroll.clientHeight;
        },

        getScrollParent: function (node) {
          if (node === null) {
            return null;
          } else if (node.scrollHeight > node.clientHeight) {
            return node;
          } else {
            return scope.element.getScrollParent(node.parentNode);
          }
        },

        getOffset: function (elem) {
          let scroll = elem.getBoundingClientRect();
          return {
            left: scroll.left + window.scrollX,
            top: scroll.top + window.scrollY
          }
        },

        setActionButtons: function () {
          if (scope.controllerElement.getBoundingClientRect().top > scope.scrollParentHeight) {
            scope.element.classList.add('fixed-bottom');
          } else {
            scope.element.classList.remove('fixed-bottom');
          }
        },

        objController: function () {
          this.document.createElement('div');
          this.style.visibility = 'hidden';
          return this;
        },

        init: function () {

          scope.element.scroll.insertBefore(scope.element.objController, scope.element.self);

          angular.element(scope.element.scroll).on('scroll', function () {
            scope.element.setActionButtons();
          });

          scope.element.setActionButtons();
        }
      }

      scope.element.init();

    }
  }

}]);
