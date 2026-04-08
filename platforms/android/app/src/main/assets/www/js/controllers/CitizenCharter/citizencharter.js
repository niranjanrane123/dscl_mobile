angular.module('starter')
  .controller('CitizenCharterCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter,
		  ENV, $state, sharedProperties, $localStorage, localStorageService,$sessionStorage) {

	/*in app browser loader start n stop*/
  $scope.inappbrowserlinnk=function(link){

    var inAppBrowserbRef = null;
    console.log("link----------"+link)
    inAppBrowserbRef = window.open(encodeURI(link), '_blank', 'location=no,toolbar=no');

		inAppBrowserbRef.addEventListener('loadstart', inAppBrowserbLoadStart);
        inAppBrowserbRef.addEventListener('loadstop', inAppBrowserbLoadStop);
        inAppBrowserbRef.addEventListener('loaderror', inAppBrowserbLoadError);
        inAppBrowserbRef.addEventListener('exit', inAppBrowserbClose);

   function inAppBrowserbLoadStart(event) {
		 navigator.notification.activityStart("Please Wait", "Its loading....");
    }

    function inAppBrowserbLoadStop(event) {
		 navigator.notification.activityStop();
    }

    function inAppBrowserbLoadError(event) {
	     navigator.notification.activityStop();
    }

    function inAppBrowserbClose(event) {
         inAppBrowserbRef.removeEventListener('loadstart', iabLoadStart);
         inAppBrowserbRef.removeEventListener('loadstop', iabLoadStop);
         inAppBrowserbRef.removeEventListener('loaderror', iabLoadError);
         inAppBrowserbRef.removeEventListener('exit', iabClose);
    }
}

    var _init = function (){

    };

    _init();
  });
