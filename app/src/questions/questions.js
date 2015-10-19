crowdLearnApp.questionsModule = angular.module('crowdLearnApp.questions',[]);

crowdLearnApp.questionsModule.controller('QuestionsController', ['$log', '$scope', '$ionicModal', 'QuestionsService', 'TagsDataService', 'FBURL', '$firebaseObject', function ($log, $scope, $ionicModal, QuestionsService, TagsDataService, FBURL, $firebaseObject){
  $scope.data={};
  $scope.data.tags = [];
  var questions = QuestionsService.val();

// questions.$bindTo($scope, "questions").then(function() {
//   console.log($scope.questions); // { foo: "bar" }
//     $scope.data.tags = $scope.questions;
// });

  questions.$loaded().then(function(dataSnapshot){
    $log.debug(dataSnapshot);
    $scope.questions = dataSnapshot;
    $scope.data.tags = $scope.questions;
  });

  $scope.showQuestion = function(questionItem, key){
    $log.debug(questionItem, key);
    var qRef = new Firebase(FBURL+"/questions/"+key+'/sources');
    var qObj = $firebaseObject(qRef);
    $scope.question = questionItem;
    $scope.question.key = key;
    qObj.$bindTo($scope, "question.sources").then(function(){
      console.log($scope.question);
    });
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
      questions.addSource(itemKey, $scope.question.newSource).then(function(){
        // $scope.$digest();
      });
    };
    $scope.size= function(sources){
      return _.size(sources);
    }
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


crowdLearnApp.questionsModule.factory('QuestionsListFactory', ['$log', '$firebaseObject', '$q', function ($log, $firebaseObject, $q){
  return $firebaseObject.$extend({
    addSource: function(questionId, source){
      var deferred = $q.defer();
      $log.debug(this.$ref(),questionId, source);
      if(questionId && source){
        this.$ref().orderByChild('_id').equalTo(questionId).once('value', function(dataSnapshot){
          if(dataSnapshot.exists()){
          dataSnapshot.forEach(function(childSnapshot){
            childSnapshot.ref().child('sources').push(source, function(error){
              if(!error){
                deferred.resolve();
              } else {
                deferred.reject(error);
              }
            });
          });
          } else {
            deferred.reject(error);
          }
        });
      }
      return deferred.promise;
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
