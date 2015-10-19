crowdLearnApp.homeModule = angular.module('crowdLearnApp.home',[]);

crowdLearnApp.homeModule.config(['$stateProvider', function ($stateProvider) {
  'use strict';
  $stateProvider
    .state('home', {
      url: '/',
      abstract: true,
      template: '<ui-view/>'
    })
    .state('home.index', {
      url: '',
      views: {
        '': {
          templateUrl: 'src/home/home-template.html'
        }
      }
    });
}]);
