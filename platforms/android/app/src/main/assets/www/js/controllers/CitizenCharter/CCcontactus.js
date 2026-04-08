angular.module('starter')
  .controller('CCcontactUsCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter,
		  ENV, $state, sharedProperties, $localStorage, localStorageService,$sessionStorage) {

/* old one
$scope.contact = true;
$scope.department = false;

    $scope.buttonclick = function(action)
    {

      console.log("action--"+action)
      if(action == 'contact') $scope.contact = true;
      else $scope.contact = false;

      if(action == 'department') $scope.department = true;
      else $scope.department = false;

    }*/


/*---------------calling function--------------------------*/
function onSuccess(result){
  console.log("Success:"+result);
}
function onError(result) {
  console.log("Error:"+result);
}

$scope.CallNumber=function(pid){
$scope.number=document.getElementById(pid).textContent;
//alert($scope.number);
window.plugins.CallNumber.callNumber(onSuccess, onError, $scope.number, false);

}

/*--------------------email function------------------------------*/
$scope.mail=function(mid){
$scope.email=document.getElementById(mid).textContent;
//alert($scope.email);
console.log("email"+$scope.email);
cordova.plugins.email.open({
    to:      $scope.email,
    subject: 'Subject for contact',
    body:    'Your Email matter here'
});
}

/*-----------------------saving contact----------------------------*/

$scope.SaveContact=function(nid,pid,mid){

$scope.name=document.getElementById(nid).innerText;
$scope.num=document.getElementById(pid).textContent;
$scope.email=document.getElementById(mid).textContent;

var myContact = navigator.contacts.create({"displayName":$scope.name});
var name = new ContactName();

myContact.name =$scope.name;

var phoneNumbers = [];
phoneNumbers[0]=new ContactField('work', $scope.num , true);
myContact.phoneNumbers = phoneNumbers;
myContact.note = "Example note for the newly added contact";
var emails=[];
emails[0]=new ContactField('work' , $scope.email , false);
myContact.emails=emails;
//alert($scope.email);
   myContact.save(contactSuccess, contactError);

   function contactSuccess() {
      alert("Contact is saved in your contact list!");
   }
   function contactError(message) {
      alert('Failed because: ' + message);
   }
}

/*-------------------------Sharing of contact-----------------------------*/
$scope.ShareContact=function(nid,pid,mid,aid){

$scope.name=document.getElementById(nid).innerText;
$scope.num=document.getElementById(pid).textContent;
$scope.email=document.getElementById(mid).textContent;
$scope.addr=document.getElementById(aid).textContent;

var options = {
  message: 'Contact Information:\n\nName: ' + $scope.name + '\nPhone Number: ' + $scope.num + '\nE-mail: ' + $scope.email + '\nAddress: ' + $scope.addr , // not supported on some apps (Facebook, Instagram)
  subject: 'Contact'+ $scope.name, // fi. for email
  chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
}
var onSuccess = function(result) {
  console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
  console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
}
var onError = function(msg){
  console.log("Sharing failed with message: " + msg);
}

window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);

}

var _init = function (){};
    _init();
  });
