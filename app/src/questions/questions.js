crowdLearnApp.questionsModule = angular.module('crowdLearnApp.questions',[]);

crowdLearnApp.questionsModule.config(['$stateProvider', function ($stateProvider) {
  'use strict';
  $stateProvider
    .state('questions', {
      url: '/questions',
      abstract: true,
      controller: 'QuotesController',
      template: '<ui-view/>'
    })
    .state('questions.index', {
      url: '',
      views: {
        '': {
          templateUrl: 'src/questions/templates/questions-index-template.html'
        }
      }
    });
}]);

crowdLearnApp.questionsModule.controller('QuotesController', ['$log', '$scope', 'QuestionsService', function ($log, $scope, QuestionsService){

}]);

crowdLearnApp.questionsModule.service('QuestionsService', ['$log', 'QuestionsList', function ($log, QuestionsList){
  var _data = new QuestionsList();
  return {
    val: function(){
      return _data;
    },
  };
}]);

crowdLearnApp.questionsModule.factory('QuestionsList', ['$log', '$q', 'FBURL', function ($log, $q, FBURL){
  return function(){
    var deferred = $q.defer();
    var quotesRef = new Firebase(FBURL+'/questions');
    var data = {};
    var dataPromise = quotesRef.once('value', function(dataSnapshot){
      if(dataSnapshot.exists()){
        data = dataSnapshot.val();
        deferred.resolve(data);
        $log.debug('QuestionsList data set to ', data);
      } else {
        deferred.reject();
      }
    });
    return deferred.promise;
  };
}]);


// crowdLearnApp.questionsModule.factory('QuestionsListFactory', ['$log', '$firebaseArray', function ($log, $firebaseArray){
//   return $firebaseArray.$extend({

//   });
// }]);
