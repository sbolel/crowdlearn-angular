crowdLearnApp.contactModule = angular.module('crowdLearnApp.contact',[]);

crowdLearnApp.contactModule.config(['$stateProvider', function ($stateProvider) {
  'use strict';
  $stateProvider
    .state('app.contact', {
      url: '/contact',
      views: {
        'menuContent': {
          templateUrl: 'src/contact/contact-template.html'
        }
      }
    });
}]);
