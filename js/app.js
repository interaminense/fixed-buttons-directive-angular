var app = angular.module('app',[]);

app.controller('ctrl', ['$scope', function($scope) {
  // $scope.teste = function(){
  //   document.querySelector('.content-wrapper').style.display = 'block';
  // }
}]);

app.directive('tgFixedButtons', ['$window', '$document', function ($window, $document) {

  return {
    restrict: 'E',
    link: function (scope, elem) {

      scope.calcDocumentClientHeight = function() {
        return $document[0].body.clientHeight - 100;
      }

      scope.functionPositionButtons = function(){
        if($window.pageYOffset + $window.innerHeight < scope.calcDocumentClientHeight()){
          elem[0].classList.add("fixed-bottom");
        }else{
          elem[0].classList.remove("fixed-bottom");
        }
      }

      //calls this function to load the page
      scope.functionPositionButtons();

      //calls this function by clicking the dom
      angular.element($document).on('click', function(){
        scope.functionPositionButtons();
      });

      //calls this function to scroll the page
      angular.element($window).on('scroll', function(){
        scope.functionPositionButtons();
      });

    }
  }

}]);
