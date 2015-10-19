crowdLearnApp.contactModule = angular.module('crowdLearnApp.contact',[]);

crowdLearnApp.contactModule.config(['$stateProvider', function ($stateProvider) {
  'use strict';
  $stateProvider
    .state('contact', {
      url: '/contact',
      views: {
        '': {
          templateUrl: 'src/contact/contact-template.html'
        }
      }
    });
}]);
