layoutModule.header.directive('layoutHeader', function () {
  'use strict';
  return {
    scope: {
      nav: '=',
      buttonClass: '@'
    },
    controller: 'HeaderController',
    templateUrl: 'src/layout/header-template.html'
  };
});