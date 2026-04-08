angular.module('starter')
  .controller('newComplaintCTRL', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV,$ionicHistory,
		  $state,$localStorage,$sessionStorage,$ionicModal,$ionicPopup) {
$scope.data = {};

		$scope.orgid = $localStorage.selectedorgID;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginfirstName = $localStorage.responselogindata.firstName;
		$scope.loginmiddleName = $localStorage.responselogindata.middleName;
		$scope.loginlastName = $localStorage.responselogindata.lastName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
    if($scope.loginmiddleName==null || $scope.loginmiddleName==undefined)
            $scope.loginmiddleName="";

		$scope.fullName = $scope.loginfirstName +" "+ $scope.loginmiddleName + " "+$scope.loginlastName;
/*


                    pgapplfullNAme = pgaplName +" "+ pgaplMName +" "+pgaplLName;
$scope.posts = [
      {
          "text":"gajendra",
          "date":"20/06/2018",
          "like":15,
          "comments":[
              {"comment":"Yorum 1", "like":100},
              {"comment":"Yorum 2", "like":200},
              {"comment":"Yorum 3", "like":300}
          ]
      },
      {
          "text":"text2",
          "date":null,
          "like":1545,
          "comments":[
              {"comment":"Yorum 4", "like":500},
              {"comment":"Yorum 5", "like":600}
          ]
      }
    ];

    $scope.postLike = function(key) {
      var like = $scope.posts[key].like;
      like = ($scope.posts[key].like == 1) ? 0 : 1 ;
      $scope.posts[key].like = like;
    };

    $scope.newcomment = {};
    $scope.postCommand = function(key){
      $scope.posts[key].comments.push($scope.newcomment[key]);
      $scope.newcomment = {};
    };

    $scope.commentLike = function(key, keyC) {
      var like = $scope.posts[key].comments[keyC].like;
      like = ($scope.posts[key].comments[keyC].like == 1) ? 0 : 1 ;
      $scope.posts[key].comments[keyC].like = like;
    };
*/


$scope.ShareContact=function(nid){

$scope.name =nid;

var options = {
  message: 'Contact Information:\n\nName: ' + $scope.name, // not supported on some apps (Facebook, Instagram)
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


$scope.yourComplaint = function(){
$ionicLoading.show({	template: $filter('translate')('LOADING')	});

  RestService.commonSearchStatus($scope.LoginMobileNo).then(function (response) {
        if(response != "" || response != undefined)
          {
              var mobileStatusList = response
                   if(mobileStatusList.length >= 0){
                      $scope.mobileStatus = [];
                      for(var i=0;i<mobileStatusList.length;i++){
                          $scope.mobileStatus.push({
                            tokenNo : mobileStatusList[i].applicationId,
                            date : formatDate(mobileStatusList[i].createdDate),
                            complaintType : mobileStatusList[i].departmentComplaintDesc,
                            complaintSubType : mobileStatusList[i].complaintTypeDesc,
                            ward : mobileStatusList[i].locationEngName,
                            description : mobileStatusList[i].description,
                            status : mobileStatusList[i].status,
                       })
                    }
                      $scope.mobilestatus = true;
                        $ionicLoading.hide();
                  }
          }else{
              toaster.error($filter('translate')('ERROR'), $filter('translate')('Please Enter Valid Token Number'));
              $ionicLoading.hide();
          }
            $ionicLoading.hide();
          },
        function (err){
          $ionicLoading.hide();
          toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
        })

}

    var _init = function (){
        $scope.yourComplaint();
    };
    _init();
  });
