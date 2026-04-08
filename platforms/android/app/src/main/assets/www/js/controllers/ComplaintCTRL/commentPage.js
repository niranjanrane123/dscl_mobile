angular.module('starter')
  .controller('commentPageCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV,$ionicHistory,
		  $state, $localStorage,$sessionStorage,$ionicModal,$ionicPopup) {

/*function start*/
		$scope.orgid = $localStorage.selectedorgID;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginfirstName = $localStorage.responselogindata.firstName;
		$scope.loginmiddleName = $localStorage.responselogindata.middleName;
		$scope.loginlastName = $localStorage.responselogindata.lastName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
    if($scope.loginmiddleName==null || $scope.loginmiddleName==undefined)
            $scope.loginmiddleName="";

		$scope.fullName = $scope.loginfirstName +" "+ $scope.loginmiddleName + " "+$scope.loginlastName;

   $scope.commentArray = [];  //Main Object hare I'm adding all Comment informations
            $scope.addComment = function () {
        console.log(" $scope.commentArray--"+JSON.stringify($scope.commentArray));
                if($scope.data.CommentText!=null)
                {
                    $scope.commentArray.push($scope.data.CommentText);
                    $scope.data.CommentText = "";
                }
            }
            $scope.romoveComment = function ($comText) {  // Delete button click Event
                $scope.commentArray.splice($comText,1);
            }


    var _init = function (){    };
    _init();
  });
