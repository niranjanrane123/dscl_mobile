angular.module('starter')

  .controller('webView', function ($cordovaInAppBrowserProvider) {

    $cordovaInAppBrowser.open('http://ngcordova.com', '_blank', options)
      .then(function(event) {
        // success
      })
      .catch(function(event) {
        // error
      });
  })
