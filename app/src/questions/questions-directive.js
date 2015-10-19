crowdLearnApp.questionsModule.directive('questionsList', function () {
  'use strict';
  return {
    scope: {
    },
    controller: 'QuestionsController',
    templateUrl: 'src/questions/templates/questions-index-template.html'
  };
});