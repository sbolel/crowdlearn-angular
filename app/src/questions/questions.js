crowdLearnApp.questionsModule = angular.module('crowdLearnApp.questions',[]);

crowdLearnApp.questionsModule.controller('QuestionsController', ['$log', '$scope', '$ionicModal', 'QuestionsService', 'TagsDataService', function ($log, $scope, $ionicModal, QuestionsService, TagsDataService){
  $scope.data={};
  $scope.data.tags = [];
  var questions = QuestionsService.val();
  questions.$loaded().then(function(dataSnapshot){
    // $log.debug(dataSnapshot);
    $scope.questions = dataSnapshot;
    $scope.data.tags = $scope.questions;
  });
  $scope.showQuestion = function(questionItem, key){
    $log.debug(questionItem, key);
    $scope.question = questionItem;
    $scope.question.key = key;
    $scope.openModal();
  };
  $ionicModal.fromTemplateUrl('src/questions/templates/question-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  $scope.$on('modal.hidden', function(){});
  $scope.$on('modal.removed', function(){});

  $scope.data = { "tags" : [], "search" : '' };
    $scope.search = function() {
      TagsDataService.searchTags($scope.questions, $scope.data.search).then(
        function(matches) {
          $scope.data.tags = matches;
        }
      )
    };

    $scope.addSource = function(itemKey){
      $log.debug(itemKey, $scope.question.newSource);
      questions.addSource(itemKey, $scope.question.newSource);
    };

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
    addSource: function(questionId, source){
      $log.debug(this.$ref(),questionId, source);
      if(questionId && source){
        this.$ref().orderByChild('_id').equalTo(questionId).once('value', function(dataSnapshot){
          if(dataSnapshot.exists()){
          dataSnapshot.forEach(function(childSnapshot){
            childSnapshot.ref().child('sources').push(source);
          });
          }
        });
      }
    }
  });
}]);

crowdLearnApp.questionsModule.factory('TagsDataService', function($q, $timeout) {
  var searchTags = function(tags, searchFilter) {
  var deferred = $q.defer();
  var matches = _.filter(tags, function(tag) {
    if(tag && tag.content){
      if(tag.content.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1 ) return tag;
    }
  })
    $timeout( function(){
       deferred.resolve( matches );
    }, 100);
    return deferred.promise;
  };
  return {
      searchTags : searchTags
  }
});
