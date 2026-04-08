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

  .controller('FeedbackCtrl', function ($rootScope, $scope, $localStorage, $ionicPlatform, $ionicPopup, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $state) {

    $scope.firstname;
    $scope.lastname;
    $scope.mobileno;
    $scope.EmailID;
    $scope.desc;
    $scope.subject;
    $scope.orgid = $localStorage.selectedorgID;
    $scope.langid = $localStorage.langID;
    $scope.contactPerson = '';
    // $scope.userID = $localStorage.responselogindata.userId;

    $scope.firstname = $localStorage.responselogindata.firstName;
    $scope.lastname = $localStorage.responselogindata.lastName;
    $scope.mobileno = $localStorage.responselogindata.mobileNo;
    $scope.EmailID = $localStorage.responselogindata.emailId;
    function onSuccess(result) {
      console.log("Success:" + result);
    }
    function onError(result) {
      console.log("Error:" + result);
    }
    $scope.CallNumber = function (pid) {
      $scope.number = document.getElementById(pid).textContent;
      //alert($scope.number);
      window.plugins.CallNumber.callNumber(onSuccess, onError, $scope.number, false);
    }

    $scope.mail = function (mid) {
      $scope.email = document.getElementById(mid).textContent;
      //alert($scope.email);
      console.log("email" + $scope.email);
      cordova.plugins.email.open({
        to: $scope.email,
        subject: 'Subject for contact',
        body: 'Your Email matter here'
      });
    }

    $('textarea').on("input", function(){
      var maxlength = $(this).attr("maxlength");
      var currentLength = $(this).val().length;
  
      if( currentLength-1 >= maxlength ){
        //console.log("You have reached the maximum number of characters.");
      }else{
        var charLeft =maxlength - currentLength
        $('#char_contact').html($filter('translate')('MAXIMUM')+" 2000 : " + charLeft +" "+ $filter('translate')('LEFT_CHAR'));
        //console.log(maxlength - currentLength + " chars left");
      }
    });

    var deregisterSecond = $ionicPlatform.registerBackButtonAction(
      function () {
        if ($localStorage.responselogindata) {
          $state.go('app.home');
        } else {
          $state.go('app.LoginPage');
        }
      }, 100
    );
    $scope.$on('$destroy', deregisterSecond);
    var verfy;
    $scope.attach = function (fileObject) {
      var reader = new FileReader();
      var idValue = fileObject.getAttribute("id");
      //alert(idValue);
      verfy = fileObject.files[0];
      var maxSize = 1000000;
      var fileSize = verfy.size;
      var ext = fileObject.value.split('.').pop();
      if (ext) {
        if (ext == "pdf" || ext == "docx" || ext == "doc") {
        }
        else {
          fileObject.value = "";
          $rootScope.simpleAlert('Onlypdfdoc');
          $('#iDivBusyLoad').hide();
          return;
        }
      } else {

        $rootScope.simpleAlert('validdocument');

        $('#iDivBusyLoad').hide();
        return;
      }
      if (fileSize > maxSize) {
        fileObject.value = "";
        $rootScope.simpleAlert('validdocumentSize');
        $('#iDivBusyLoad').hide();
        return;
      }
      reader.onload = function (e) {
        console.log("about to encode");
        $scope.encoded_file = window.btoa(e.target.result.toString());
        console.log("after encode" + $scope.encoded_file);
      };
      reader.readAsBinaryString(verfy);
    }

    $scope.dept = function () {
      //		 alert("dept");
    }
    $scope.contact = function () {
      //		 alert("contact");
    }
    $scope.save = function () {

      $ionicLoading.show({ template: $filter('translate')('LOADING') });
      var postData = {
        "feedBackSubject": $scope.subject,
        "feedBackDetails": $scope.desc,
        "mobileNo": $localStorage.responselogindata.mobileNo,
        "fdUserName": $localStorage.responselogindata.firstName,
        "emailId": $localStorage.responselogindata.emailId,
        "categoryTypeName": $scope.contactPerson
      }

      RestService.innovativeIdea(postData).then(function (response) {
        if (response) {
          var confirmPopup = $ionicPopup.show({
            title: $filter('translate')('message'),
            template: $filter('translate')('FEEDBACKSENDSUCCESSFULLY'),
            buttons: [{
              text: $filter('translate')('OK'),
              type: 'button button-block  customBgColor',
              onTap: function () {
                $state.go("app.home");
              }
            }]
          });
          // $ionicLoading.hide();
          $ionicLoading.hide();
        }
        else {
          $ionicLoading.hide();
          return false;
        }
        $ionicLoading.hide();
      }, function (err) {
        toaster.error($filter('translate')('FEEDBACKERROR')/* , $filter('translate')('') */);
        $ionicLoading.hide();
      })
      //alert("save:"+ $scope.firstname + "\n" + $scope.lastname + "\n" + $scope.mobileno + "\n" + $scope.EmailID + "\n" + $scope.desc);
    }
    $scope.imageupload2 = function (fileObject) {
      console.log($scope.plbmg);
      var reader = new FileReader();
      var idValue = fileObject.getAttribute("id");
      verfy = fileObject.files[0];
      var maxSize = 1000000;
      if (verfy) {
        var fileSize = verfy.size;
        var ext = fileObject.value.split('.').pop();
        if (ext) {
          if (ext == "xls" || ext == "xlsx" || ext == "pdf" || ext == "doc" || ext == "docx") {

          }
          else {
            fileObject.value = "";
            $rootScope.simpleAlert('Onlypdfdocxls');
            $('#iDivBusyLoad').hide();
            return;
          }
        } else {
          $rootScope.simpleAlert('validdocument');
          $('#iDivBusyLoad').hide();
          return;
        }
        if (fileSize > maxSize) {
          fileObject.value = "";
          $rootScope.simpleAlert('validdocumentSize');
          $('#iDivBusyLoad').hide();
          return;
        }
        reader.onload = function (e) {
          console.log("about to encode");
          $scope.encoded_file = window.btoa(e.target.result.toString());
        };
        reader.readAsBinaryString(verfy);
      } else {
        $scope.encoded_file = undefined;
      }

    };
    $scope.reset = function () {
      //		 alert("reset");
    }
    $scope.fetchSelected = function () {

    }
    var _init = function () {
      // RestService.feedbacklist(1).then(function (response) {
      //   console.log("deptresponse--" + response);
      //   if (response == undefined || response == null || response == "") {
      //     $ionicLoading.hide();
      //     toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
      //     return false;
      //   }
      //   else {
      //     $scope.response = response;
      //     console.log("dfgh" + $scope.response);
      //     console.log("dfgh" + typeof ($scope.response));
      //     $ionicLoading.hide();
      //   }
      //   $ionicLoading.hide();
      // }, function (err) {
      //   toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
      //   $ionicLoading.hide();
      // })
    };

    _init();

  })
