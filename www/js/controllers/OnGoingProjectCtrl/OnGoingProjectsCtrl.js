angular.module('starter')

  .controller('OnGoingProjectsCtrl', function ($scope,RestService,$localStorage,$sessionStorage, $ionicPlatform,$ionicListDelegate,$ionicLoading, $stateParams, toaster, $filter, ENV, $state) {

    $scope.comeFrom  =  $sessionStorage.comeFrom; 
    $scope.OnGoingProjects = [];  
    $scope.projects = ""
    $scope.pageTitle = "";
    $scope.url = "";
    console.log("***comeFrom=", $scope.comeFrom);
    

    if($scope.comeFrom == "OnGoingProjects")
    {
       $scope.pageTitle = $filter('translate')('ON_GOING_PROJECTS');
       $scope.url = "section/name/On Going Projects /lang/"+ $localStorage.langID +"/org/1";
    }
    else if($scope.comeFrom == "PopularPlaces")
    {
        $scope.pageTitle = $filter('translate')('POPULAR_PLACE');
        $scope.url = "section/name/Dehradun Tourist Locations /lang/"+ $localStorage.langID +"/org/1"; 
    }
    // else{

    //     $scope.pageTitle = "Doon1" ;
    // }
    
    var deregisterSecond = $ionicPlatform.registerBackButtonAction(
  		      function() {
                          if($localStorage.responselogindata){
                           		                $state.go('app.home');
                           		               }else{
                           		               $state.go('app.LandingPage');
                           		               }
  		      }, 100
  		    );



              RestService.getOnGoingProjects($scope.url).then(function (response) {
                //$ionicLoading.show({ template: $filter('translate')('LOADING') });
                console.log("On going projects**--" + response.messageList);
                $scope.OnGoingProjects = response.messageList;
                if (response == undefined || response == null || response == "") {
                  $ionicLoading.hide();
                  return false;
                }
                else if ($scope.OnGoingProjects.length > 0) {
                  console.log("$scope.OnGoingProjects");
                  $scope.projects = $scope.OnGoingProjects;                       
                }
                $ionicLoading.hide();
              }, function (err) {
                toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
                $ionicLoading.hide();
              })        

            })          