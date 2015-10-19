layoutModule.header = angular.module('layoutModule.header', ['ngMaterial']);

layoutModule.header.controller('HeaderController', ['$scope', '$rootScope', function($scope, $rootScope){

  $scope.nav = {
    title: 'CrowdLearn',
    shortTitle: 'CrowdLearn',
    brand: {
      img: 'https://cdn1.iconfinder.com/data/icons/unique-round-blue/93/group-512.png',
      uiSref: 'home.index'
    },
    buttons: [
      {val:'Overview', label:'Overview', uiSref:'home.index', ngClass: active},
    ]
  };

  function active(button){
    'use strict';
    if ($rootScope.$state.current.name === button.uiSref){
      return 'active';
    } else {
      return 'null';
    }
  }

}]);