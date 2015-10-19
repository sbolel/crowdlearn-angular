layoutModule.header.directive('layoutHeaderButton', function () {
  'use strict';
  return {
    scope: {
      button: '=',
      buttonClass: '@'
    },
    template: '<md-button ui-sref={{::button.uiSref}} ng-bind=button.val class={{buttonClass}} ng-class=button.ngClass(button) aria-label={{::button.label}}></md-button>'
  };
});