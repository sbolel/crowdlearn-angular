crowdLearnApp.questionsModule = angular.module('crowdLearnApp.questions',[]);

crowdLearnApp.questionsModule.controller('QuestionsController', ['$log', '$scope', 'QuestionsService', function ($log, $scope, QuestionsService){
  var questions = QuestionsService.val();
  questions.$loaded().then(function(dataSnapshot){
    // $log.debug(dataSnapshot);
    $scope.questions = dataSnapshot;
  });
}]);

crowdLearnApp.questionsModule.service('QuestionsService', ['$log', 'QuestionsList', function ($log, QuestionsList){
  var _data = new QuestionsList();
  return {
    val: function(){
      return _data;
    },
  };
}]);

crowdLearnApp.questionsModule.factory('QuestionsList', ['$log', 'QuestionsListFactory', 'FBURL', function ($log, QuestionsListFactory, FBURL){
  return function(){
    var firebaseRef = new Firebase(FBURL+'/questions');
    return QuestionsListFactory(firebaseRef);
  };
}]);


crowdLearnApp.questionsModule.factory('QuestionsListFactory', ['$log', '$firebaseObject', function ($log, $firebaseObject){
  return $firebaseObject.$extend({

  });
}]);
