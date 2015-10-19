(function (head) {
  'use strict';
  function social(){
    (function(d, s, id){
      var js,
      fjs=d.getElementsByTagName(s)[0],
      p=/^http:/.test(d.location)?'http':'https';
      if(!d.getElementById(id)){
        js=d.createElement(s);
        js.id=id;
        js.src=p+'://platform.twitter.com/widgets.js';
        fjs.parentNode.insertBefore(js,fjs);
     };
    }(document, 'script', 'twitter-wjs'));
  }
  head.load('release/vendor.min.css', 'release/rha.min.css' , function() {
    console.debug('CSS loaded');
    head.load({ vendor: '/release/vendor.min.js' }, { app: '/release/rha.min.js' }, function() {
      console.debug("JS loaded");
      angular.element(document.getElementsByTagName('head')).append(angular.element('<base href="'+window.location.pathname+'" />'));
      // social();
    });
  });
}(window.head));