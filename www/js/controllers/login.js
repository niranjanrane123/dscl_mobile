angular.module('starter')
 .controller('LoginPageCtrl', function ($scope, $location,$ionicHistory, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, dateFilter,
	  $state, $ionicSideMenuDelegate,$translate, $localStorage,$ionicPlatform,localStorageService,$ionicPopup,$window,$sessionStorage,$rootScope) {
	  $scope.isMainPanel = true;
	  $scope.ULBoptions = new Array();
	 //   $translate.use("2");
	  $scope.Wardoptions = new Array();
	  $scope.Zoneoptions = new Array();
	//  $localStorage.english = false;
	  $scope.data_ = {};
	  var WardList = '';
      $scope.loginmobilenumber;
      $scope.loginPassword;
      $scope.OrgID;
      $scope.UserID;
	  $scope.params = {};
      $scope.showPassword = false;
      $scope.toggleShowPassword = function() {
        $scope.showPassword = !$scope.showPassword;
      }
	   if($localStorage.langID =="1"){
                $translate.use("1");
                $localStorage.langID = "1";
             }else{
                $translate.use("2");
                $localStorage.langID = "2";
             }
          // var deregisterSecond = $ionicPlatform.registerBackButtonAction(
          //     function() {
          //       var confirmPopup = $ionicPopup.show({
          //           title : $filter('translate')('message'),
          //           template : $filter('translate')('AREYOUSURELOGOUT'),
          //           buttons : [
          //           {text: $filter('translate')('CANCEL'),
          //            type : 'button button-block  customBgColor',},
          //               {
          //                    text : $filter('translate')('OK'),
          //                    type : 'button button-block  customBgColor',

          //                    onTap : function() {
          //                       $sessionStorage.$reset();
          //                       $window.localStorage.clear();
          //                       $ionicHistory.clearCache();
          //                       $ionicHistory.clearHistory();
          //                       navigator.app.exitApp();
          //                       ionic.Platform.exitApp();
          //                   }
          //               }]
          //          });
          //     }, 100
          //   );
          //     $scope.$on('$destroy', deregisterSecond);
	  $scope.onlyNumericTenLimitInput = function()
	  {
	  	var mobileno = document.getElementById("mobileNo").value;
	  	var inputVal = mobileno;
	  	    var numericReg = /^[0-9]{1,10}$/;
	  	    if(!numericReg.test(inputVal) || inputVal.length>10)
	  	    {
	  	    	inputVal.slice(0,-1);
	  	    	var inputValSlice = inputVal.slice(0,-1);
	  	    	document.getElementById("mobileNo").value = inputValSlice;
	  	    }
	  }

/*	  $scope.languagechange = function(lang)
    {
          $translate.use(lang);
         $localStorage.langID = lang;
    }*/
  //  $translate.use("2");
//     if($localStorage.langID=="2"){
//      $scope.myText = 'English';
//     }else{
//     $scope.myText = 'Hindi';
//     }
// if($localStorage.langID=="2"){
//       $localStorage.langNewId = "2";
//     }else{
//      $localStorage.langNewId = "1";
//     }

    $scope.changeText = function(value) {
     if(value === "Hindi"){
         $translate.use("2");
         $localStorage.langID = "2";
         $localStorage.english = true;
         $localStorage.langNewId = "2";
         console.log("langId:"+ $localStorage.langNewId)
         $scope.myText = 'English';
         _init();
      }else{
          $translate.use("1");
          $localStorage.langID = "1";
          $localStorage.english = false;
          $localStorage.langNewId = "1";
          console.log("langId:"+ $localStorage.langNewId)
          $scope.myText = 'Hindi';
          _init();
      }
    };



	  $ionicSideMenuDelegate.canDragContent(false)

    $scope.login = function(){
     $ionicLoading.show({	template:$filter('translate')('LOADING')	});
      /*------getting current location------*/
        // navigator.geolocation.getCurrentPosition(success,fail);

         RestService.getNHPrefixData("LCT","1").then(function (response) {
             console.log("location response"+ JSON.stringify(response))
             if(response.length > 0){
                 $scope.locationGroup = new Array();
                   for(var i=0;i<response.length;i++){
                   if($localStorage.langID=="2"){
                     $scope.locationGroup.push({
                          id : response[i].lookUpId,
                          name : response[i].descLangSecond
                        })
                   }else{
                    $scope.locationGroup.push({
                        id : response[i].lookUpId,
                        name : response[i].descLangFirst
                      })
                   }

                 }
                   $ionicLoading.hide();
             }else{
                    return false;
                    $ionicLoading.hide();
             }
        },function (err) {
          toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
          $ionicLoading.hide();
       })

//
//      for(var i = 0; i< $scope.ULBoptions.length; i++){
//        if($scope.data_.ULBid.id == $scope.ULBoptions[i].id){
//            $scope.orgName = $scope.ULBoptions[i].name
//        }
//      }

      $localStorage.orgName = $scope.orgName;
      if(!$scope.loginmobileNo == ""){

      $ionicLoading.show({	template: $filter('translate')('LOADING')});
     // console.log("ULBid--"+$scope.data_.ULBid)
      $localStorage.selectedorgID = "1"
     // if($scope.data_.ULBid.defaultVal == 'Y'){
       $localStorage.defaultVal = 'Y';
     // }else{
       //$localStorage.defaultVal = 'N';
      //}
      RestService.loginservice($scope.loginmobileNo,$scope.loginPassword,"1",$localStorage.langID).then(function (responselogindata){
        console.log("responselogindata---"+JSON.stringify(responselogindata));
         if(responselogindata.status == "success"){
             $localStorage.responselogindata = responselogindata;
             $sessionStorage.locationGroup = $scope.locationGroup;

             $ionicHistory.clearCache();
             $ionicHistory.clearHistory();
            //  $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
            if($sessionStorage.comeFrom == 'rti')
            {
             
              $state.go("app.rtiApplicantDetial")
            }
            else  if($sessionStorage.comeFrom == 'complaint')
            {
              // $rootScope.swmCall = true;
              $state.go("app.complaintrefrence")
            }
            else{
             $state.go("app.home");
            }
             $ionicLoading.hide();
          }	else{
            toaster.error("", responselogindata.responseMsg);
          }
         $ionicLoading.hide();
        },
        function (err) {
          toaster.error("", $filter('translate')('WRONG_PASSWORD'));
          $ionicLoading.hide();
        })
      } else{
          toaster.error($filter('translate')('PLEASEENTERUSERNAMEANDPASS'));
          $ionicLoading.hide();
      }
    };

	  $scope.ifnotregister = function() {
		   $state.go("app.Register");
	  }

	  $scope.forgotpage = function() {
	    $state.go("app.forgotpassword");
	  }

    $scope.nidan = function()
    {
    //  $sessionStorage.GuestUser = "GuestUser";
      $state.go("app.nidanHomePage");
    }
     $scope.inputType = 'password';

      $scope.hideShowPassword = function(){
        if ($scope.inputType == 'password')
          $scope.inputType = 'text';
        else
          $scope.inputType = 'password';
      };
      
   var _init = function()
    {
    //  $ionicLoading.show({template: $filter('translate')('LOADING')});
   //   $localStorage.langID = "2";
    //  $localStorage.english = true;
//      $scope.ULBoptions.length = 0;
//      RestService.ulbService().then(function (responseULB){
//        console.log("responseULB---"+JSON.stringify(responseULB));
//         if(responseULB.status == "success"){
//          var ULBList = responseULB.lookUpList;
//            for(var i=0;i<ULBList.length;i++){
//    //	  			if($localStorage.langID == "1"){
//                if($localStorage.langNewId == "2"){
//                  $scope.ULBoptions.push({
//                    id : ULBList[i].lookUpId,
//                    name : ULBList[i].descLangSecond,
//                    option: ULBList[i].descLangSecond,
//                    defaultVal:ULBList[i].defaultVal
//                  })
//                }else{
//                  $scope.ULBoptions.push({
//                    id : ULBList[i].lookUpId,
//                    name : ULBList[i].descLangFirst,
//                    option: ULBList[i].descLangFirst,
//                    defaultVal:ULBList[i].defaultVal
//                  })
//                }
//             }
//           $ionicLoading.hide();
//          }	else{
//    //				toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
//            $ionicLoading.hide();
//          }
//         $ionicLoading.hide();
//      },
//      function (err){
//          toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
//          $ionicLoading.hide();
//      })
    };

_init();

  })
