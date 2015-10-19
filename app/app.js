var crowdLearnApp = angular.module('crowdLearnApp', [
  'ui.router',
  'ngMaterial',
  'ionic',
  'firebase',
  'crowdLearnApp.home',
  'crowdLearnApp.user',
  'crowdLearnApp.contact',
  'crowdLearnApp.form',
  'crowdLearnApp.questions',
  'layoutModule',
  'layoutModule.header',
])
.constant('ENV', 'dev')
.constant('FBURL', 'https://sccs.firebaseio.com/')

.config(['$urlRouterProvider', '$stateProvider', '$logProvider', function ($urlRouterProvider, $stateProvider, $logProvider) {
  'use strict';
  $logProvider.debugEnabled(true);
  $stateProvider
  .state('app', {
    url: '',
    templateUrl: "templates/menu.html"
  });
  $urlRouterProvider.otherwise('/');
}])

.run(['$log', '$rootScope', '$state', '$stateParams', '$window', function ($log, $rootScope, $state, $stateParams, $window) {
  'use strict';
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState){ 
    $rootScope.$state.$back = fromState;
  });
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    $log.error('$stateChangeError: ', error, $rootScope.$state);
    if (error === 'AUTH_REQUIRED') {
      $state.go('user.login');
    }
  });
  $rootScope.$browser = function(){
    return getBrowser();
  };
  function getBrowser(){
    var browsers = {chrome: /chrome/i, safari: /safari/i, firefox: /firefox/i, ie: /internet explorer/i};
    var userAgent = $window.navigator.userAgent;
    for(var key in browsers){
      if (browsers[key].test(userAgent)) {
          return key;
      }
    }
  }
}]);

crowdLearnApp.filter('reverse',function() {
  'use strict';
  return function(items) {
    return _.toArray(items).slice().reverse();
  };
});
