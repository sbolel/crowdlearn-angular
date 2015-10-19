  var layoutModule = angular.module('layoutModule', [
    'ngMaterial']);

  layoutModule.provider('layoutModule',[function() {
    var backFallback = null;
    this.setBackFallback = function(state){
      backFallback = state;
    };
    this.$get = [function LayoutFactory() {
      return new Layout(backFallback);
    }];
  }]);

  layoutModule.controller('LayoutController', ['$scope', '$rootScope', function ($scope, $rootScope){
    $scope.fab = {
      isOpen: false,
      close: function(){
        if($scope.fab.isOpen === true){
          $scope.fab.isOpen = false;
        }
      }
    };
    $rootScope.$on('$stateChangeSuccess', function(){ 
      $scope.fab.close();
    });
  }]);