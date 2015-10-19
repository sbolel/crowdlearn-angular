crowdLearnApp.homeModule = angular.module('crowdLearnApp.home',[]);

crowdLearnApp.homeModule.config(['$stateProvider', function ($stateProvider) {
  'use strict';
  $stateProvider
    .state('app.home', {
      url: '/',
      abstract: true,
      views: {
        'menuContent': {
          template: '<ui-view/>'
        }
      }
    })
    .state('app.home.index', {
      url: '',
      views: {
        '': {
          templateUrl: 'src/home/home-template.html'
        }
      }
    });
}]);
