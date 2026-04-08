/*
angular.module('starter')
  .controller('CCofficeCtrl', function ($rootScope,$scope, RestService, $ionicLoading, $stateParams, toaster, $filter,
		  ENV, $state, sharedProperties, $localStorage, localStorageService,$sessionStorage) {


  $scope.whatsappShare=function(){
   	window.plugins.socialsharing.shareViaWhatsApp('Name: Gajendra Mobile No:9664611565',
                                                    null */
/* img *//*
,
                                                    null,
                                                    null,
                                                    function(errormsg){alert("Error: Cannot Share")}
                                                    );
  }


 $scope.OtherShare=function(){
   var somevalue = "DataToBeSendHere"

     window.plugins.socialsharing.share(somevalue,
     null,
     null,
    'https://play.google.com/store/apps/details?id=com.prantikv.digitalsignaturemaker');
  }

 $scope.createContact = function() {

   var myContact = navigator.contacts.create({
   "displayName": "Gajju1807"
   });

var phoneNumbers = [];
phoneNumbers[0] = new ContactField('mobile', '917-555-5432', true); // preferred number
myContact.phoneNumbers = phoneNumbers;

   myContact.save(contactSuccess, contactError);

   function contactSuccess() {
      alert("Contact is saved!");
   }

   function contactError(message) {
      alert('Failed because: ' + message);
   }

}


$scope.email = function(){

cordova.plugins.email.isAvailable(
    function (isAvailable) {
         alert('Service is not available');
    }
);

cordova.plugins.email.open({
    to:      'max@mustermann.de',
    cc:      'erika@mustermann.de',
    bcc:     ['john@doe.com', 'jane@doe.com'],
    subject: 'Greetings',
    body:    'How are you? Nice greetings from Leipzig'
});


}

    var _init = function (){

    };
    _init();
  });
*/
angular.module('starter')

.controller('ContactusCtrl', function ($rootScope,$scope,$localStorage,$ionicPlatform, $ionicPopup,RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $state) {

$scope.firstname;
$scope.lastname;
$scope.mobileno;
$scope.EmailID;
$scope.desc;
$scope.contactPerson;
 $scope.orgid = $localStorage.selectedorgID;
 $scope.langid = $localStorage.langID;
 $scope.logindetail = $localStorage.responselogindata
// $scope.userID = $localStorage.responselogindata.userId;
console.log('$localStorage.responselogindata..', $localStorage.responselogindata);
if($scope.logindetail){
  $scope.firstname = $scope.logindetail.firstName;
  $scope.lastname = $scope.logindetail.lastName;
  $scope.mobileno = $scope.logindetail.mobileNo;
  $scope.EmailID = $scope.logindetail.emailId;
}

//Defect #194376
/* function onSuccess(result){
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



$scope.ShareContact=function(nid,pid,mid,aid){

$scope.name=document.getElementById(nid).innerText;
$scope.num=document.getElementById(pid).textContent;
$scope.email=document.getElementById(mid).textContent;
$scope.addr=document.getElementById(aid).textContent;

var options = {
  message: 'Contact Information:\n\nName: ' + $scope.name + '\nPhone Number: ' + $scope.num + '\nE-mail: ' + $scope.email + '\nAddress: ' + $scope.addr , // not supported on some apps (Facebook, Instagram)
  subject: 'Contact '+$scope.name, // fi. for email
  chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
}
var onSuccess = function(result) {
  console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
  console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
}
var onError = function(msg) {
  console.log("Sharing failed with message: " + msg);
}
window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);

}

$scope.SaveContact=function(nid,pid,mid){

$scope.name=document.getElementById(nid).innerText;
$scope.num=document.getElementById(pid).textContent;
$scope.email=document.getElementById(mid).textContent;

var myContact = navigator.contacts.create({"displayName":$scope.name});
var name = new ContactName();
myContact.name =$scope.name;
 $scope.response = [];

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
 */
	  var deregisterSecond = $ionicPlatform.registerBackButtonAction(
  		      function() {
                          if($scope.logindetail){
                                $state.go('app.home');
                               }else{
                               $state.go('app.LandingPage');
                               }
  		      }, 100
  	  );
  	$scope.$on('$destroy', deregisterSecond);
var verfy;
$scope.attach=function(fileObject){
 var reader = new FileReader();
			var idValue	= fileObject.getAttribute("id");
			//alert(idValue);
			verfy  = fileObject.files[0];
			var maxSize = 1000000;
		    var fileSize = verfy.size;
			var ext = fileObject.value.split('.').pop();
			if(ext){
		    	if(ext == "pdf" || ext == "docx" || ext == "doc"){
		        }
		    	else{
		    		fileObject.value = "";
		        	$rootScope.simpleAlert('Onlypdfdoc');
		            $('#iDivBusyLoad').hide();
		            return;
		    	}
		    }else{
		    	
      $rootScope.simpleAlert('validdocument');
      
		    	$('#iDivBusyLoad').hide();
		    	return;
		    }
		    if(fileSize > maxSize){
		    	fileObject.value = "";
		        $rootScope.simpleAlert('validdocumentSize');
		        $('#iDivBusyLoad').hide();
		        return;
		    }
	  		reader.onload = function(e){
	  		console.log("about to encode");
	  		$scope.encoded_file = window.btoa(e.target.result.toString());
	  		console.log("after encode"+$scope.encoded_file);
};
reader.readAsBinaryString(verfy);
}

	 $scope.dept = function(){
//		 alert("dept");
	 }
	 $scope.contact = function(){
//		 alert("contact");
	 }
	 $scope.save = function(){
    
	 $ionicLoading.show({	template: $filter('translate')('LOADING')	});
	  var postData = {
            "phoneNo": $scope.mobileno,
            "descQuery": $scope.desc,
            "firstName": $scope.firstname,
            "lastName": $scope.lastname,
            "emailId": $scope.EmailID,
            "isDeleted": null,
            "orgId": $scope.orgid,
            "empId": $scope.userID,
            "langId":$scope.langid,
            "contactUs": $scope.contactPerson,
            "lmodDate": null,
            "updatedBy": null,
            "updatedDate": null,
            "lgIpMac": null
	  }

	  RestService.saveContachData(postData).then(function (response) {

      					  if(response==undefined || response==null || response=="")
      					  {
      						  toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
      						  $ionicLoading.hide();
      						  return false;
      					  }
      					  else if(response == true)
      					  {
      					   var confirmPopup = $ionicPopup.show({
                                      title : $filter('translate')('message'),
                                      template : $filter('translate')('DATASUCCESSFULLYSAVED'),
                                      buttons : [{
                                      text : $filter('translate')('OK'),
                                      type : 'button button-block  customBgColor',
                                      onTap : function(){
                                            $scope.mobileno= '';
                                            $scope.firstname= '';
                                            $scope.lastname= '';
                                            $scope.EmailID= '';
                                            $scope.desc= '';
                                            $scope.contactPerson = '';
                                            if($scope.logindetail){
                                              $state.go('app.home');
                                            } else {
                                              $state.go('app.LandingPage');
                                            }
                                            
                                        }
                                      }]
                                    });

      						  $ionicLoading.hide();
      					  }else{
      					   //toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
                   toaster.error($filter('translate')('CONTACTUSEERROR'));
                                 						  $ionicLoading.hide();
                                 						  return false;
      					  }
      					    $ionicLoading.hide();
      					}, function (err) {
      						//toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
                  toaster.error($filter('translate')('CONTACTUSEERROR'));
      						$ionicLoading.hide();
      					})
		 //alert("save:"+ $scope.firstname + "\n" + $scope.lastname + "\n" + $scope.mobileno + "\n" + $scope.EmailID + "\n" + $scope.desc);
	 }
   $scope.imageupload2 = function(fileObject){
    console.log($scope.plbmg);
     var reader = new FileReader();
     var idValue	=	fileObject.getAttribute("id");
     verfy  = fileObject.files[0];
     var maxSize = 1000000;
     $scope.fileName = verfy.name;
     if(verfy){
        var fileSize = verfy.size;
        var ext = fileObject.value.split('.').pop();
        if(ext){
            if(ext == "png" || ext == "jpeg" || ext == "jpg"){

              }
            else{
              fileObject.value = "";
                alert('Only jpeg,jpg,png,gif,bmp extension(s) file(s) allow.');
                  $('#iDivBusyLoad').hide();
                  return;
            }
          }else{
            alert("Please uplaod a valid image");
            $('#iDivBusyLoad').hide();
            return;
          }
                if(fileSize > maxSize){
                    fileObject.value = "";
                    $scope.encoded_file = undefined;
                    alert('File Size Must Not Be Greater Than 1 MB');
                    $('#iDivBusyLoad').hide();
                    return;
                }
               reader.onload = function(e){
                console.log("about to encode");
                $scope.encoded_file = window.btoa(e.target.result.toString());
              };
             reader.readAsBinaryString(verfy);
     }else{
       $scope.encoded_file = undefined;
     }
     
    };

    
	 /* $scope.reset = function(){
//		 alert("reset");
	 } */
	 /* $scope.fetchSelected = function(){

	 } */
	  var _init = function (){
           RestService.contactuslist($scope.langid).then(function (response){
                          console.log("deptresponse--"+response);
                          if(response==undefined || response == null || response=="")
                            {
                              $ionicLoading.hide();
                              //toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
                              toaster.error($filter('translate')('CONTACTUSEERROR'));
                              return false;
                            }
                          else
                            {
                              //$scope.response = response;
                              $scope.contactPerson = response[0];
                              console.log('$scope.contactPerson-->',$scope.contactPerson);
                              // console.log("dfgh"+$scope.response);
                              // console.log("dfgh"+typeof($scope.response));
                              $ionicLoading.hide();
                            }
                          $ionicLoading.hide();
                        },function (err) {
                          //toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
                          toaster.error($filter('translate')('CONTACTUSEERROR'));
          			          $ionicLoading.hide();
          	            })
         };
         _init();

  })
