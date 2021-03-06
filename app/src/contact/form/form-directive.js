crowdLearnApp.formModule.directive('contactForm', function () {
  'use strict';
  return {
    require: [],
    scope: {
      title: '@'
    },
    controller: 'FormController',
    template: '<form name=contact ng-submit=submit() layout=column class=mt20 style=margin:auto;width:100%;max-width:640px><h4>What\'s your info?</h4><div layout-gt-md=row layout-md=column><md-input-container flex><label>Name</label><input ng-model=messageData.name></md-input-container><md-input-container flex><label>Email (required)</label><input type=email ng-model=messageData.email required></md-input-container></div><h4>What would you like to discuss?</h4><md-input-container flex><label>Message (required)</label><textarea ng-model=messageData.message columns=1 md-maxlength=500 required></textarea></md-input-container><div flex layout layout-align="center center" class=mb10><input class="md-button md-raised md-accent" type=submit id=submit value="Submit"></div></form>'
  };
});

crowdLearnApp.formModule.directive('joinForm', function () {
  'use strict';
  return {
    require: [],
    scope: {
      title: '@'
    },
    controller: 'FormController',
    template: '<form name=contact ng-submit=submit() layout=column class=mt20 style=margin:auto;width:100%;max-width:640px><h4>What\'s your info?</h4><div layout-gt-md=row layout-md=column><md-input-container flex><label>Name</label><input ng-model=messageData.name></md-input-container><md-input-container flex><label>Email (required)</label><input type=email ng-model=messageData.email required></md-input-container></div><h4>What would you like to discuss?</h4><md-input-container flex><label>Message (required)</label><textarea ng-model=messageData.message columns=1 md-maxlength=500 required></textarea></md-input-container><div flex layout layout-align="center center" class=mb10><input class="md-button md-raised md-accent" type=submit id=submit value="Submit"></div></form>'
  };
});