angular.module('starter')

  .controller('ApplicationListPageCtrl', function ($scope,$sessionStorage,$ionicPopup, $location, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, dateFilter, $state,$ionicSideMenuDelegate,$rootScope,$localStorage) {
    
     $scope.getDashBoardData=[];
     $scope.getDashBoardDataPage=[];
     $scope.myArray = [];
     $scope.totalPagination=0;
     $scope.currentPagination=0;
     $scope.currentPaginationArray=[];
     $scope.mysearch=''; 
     $scope.langID=$localStorage.langID;
     $scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
     $scope.orgid = $localStorage.selectedorgID;
     $scope.userID = $localStorage.responselogindata.userId;
     $scope.pageNUmber = 1;

    $scope.getDashBoardDataFun=function (){

      RestService.getDashBoardData({"mobileNo":$scope.LoginMobileNo,"empId":$scope.userID,"orgId": $scope.orgid}).then(function (response){
                console.log("deptresponse--"+response);
                if(response==undefined || response == null || response=="")
                  {
                    $ionicLoading.hide();
                    return false;
                  }
                else if(response.length>0)
                  {
                    $ionicLoading.hide();
                    //$scope.myArray = response
                    response.forEach((element,index)=>{
                      // console.log('element',element)
                      if(element.serviceName != 'Complaint Registration'){
                        $scope.myArray.push(element)
                      } //$scope.myArray.splice(index,1);
                   });

                    console.log('myArray',  $scope.myArray)
                   $scope.getDashBoardData=$scope.myArray;
                   console.log("$scope.getDashBoardData",$scope.getDashBoardData);
                   $scope.totalPagination=parseInt($scope.getDashBoardData.length/8);
                   if($scope.totalPagination*8 != $scope.getDashBoardData.length)
                    $scope.totalPagination=$scope.totalPagination+1;
                   
                      $scope.getDashBoardDataPageData(0);
                    
                   
                   for(var i=0;i<$scope.totalPagination;i++)
                    $scope.currentPaginationArray.push(i);
                  }
                $ionicLoading.hide();
              },function (err) {
                toaster.error($filter('translate')('STATUSOFAPPLERROR')/* , $filter('translate')('ERROR') */);
                $ionicLoading.hide();
        })
   } 



  $scope.getDashBoardDataPageData=function(page,option){
    console.log('page 11',page);
    console.log('option 11', option);
    if(option=='fix')
      $scope.pagginationSelect=page;

    $scope.currentPagination=page;
    var minD=page*8,maxD=minD+8;
    $scope.getDashBoardDataPage=[];
    $scope.getDashBoardData.forEach((entry,index)=>{
      if(index>=minD && index<maxD && entry.serviceName != 'Complaint Registration')
     
      $scope.getDashBoardDataPage.push(entry);
    });
    console.log('11', $scope.getDashBoardDataPage)
  }

  $scope.viewHistory=function(data){
     
    $localStorage.vieHistoryData = data;
    $sessionStorage.applicationHistoryId=data.appId;
    $state.go('app.applicationHistory');
  }
   
  $scope.viewApplication=function(data){
    console.log('data', data)
    console.log('its history..');
    $localStorage.vieHistoryData = data;
    if(data.serviceName=="Complaint Registration"){
      $ionicLoading.show({ template: $filter('translate')('LOADING')  });
      RestService.getGrievanceStatus(data.appId,$localStorage.langID).then(function (complaintstatusresponse) {
        
        if(complaintstatusresponse == "" || complaintstatusresponse == undefined){
          toaster.error( $filter('translate')('VALIDTOKEN'));
          $ionicLoading.hide();
        }else{
          $sessionStorage.complaintstatusresponse = complaintstatusresponse;
          $sessionStorage.complaintstatusresponseHome=true;
          $state.go("app.compstatusdetail");
        }
        $ionicLoading.hide();
      },
      function (err){
        $ionicLoading.hide();
        toaster.error($filter('translate')('STATUSOFAPPLERROR')/* , $filter('translate')('ERROR') */);
      })
    }
    else if(data.serviceName=="File RTI On-line"){
      $ionicLoading.show({ template: $filter('translate')('LOADING')  });
      RestService.fetchInformationByApplicationid(data.appId,$scope.orgid).then(function (complaintstatusresponse) {
        if(complaintstatusresponse == "" || complaintstatusresponse == undefined){
          toaster.error( $filter('translate')('VALIDTOKEN'));
          $ionicLoading.hide();
        }else{
          $sessionStorage.rtistatusresponse = complaintstatusresponse;
          $state.go("app.rtiapplicationHistory");
        }
        $ionicLoading.hide();
      },
      function (err){
        $ionicLoading.hide();
        toaster.error($filter('translate')('STATUSOFAPPLERROR')/* , $filter('translate')('ERROR') */);
      })
    }
  }
    $scope.getNumber = function(num) {
      return new Array(num);   
    }  
    var _init = function () {
      if($localStorage.langID == "2"){
        $ionicLoading.show({ template: 'लोड हो रहा है...'    });
      }else{
        $ionicLoading.show({ template: 'Loading...'    });
      }

          $scope.getDashBoardDataFun();     
    };
   _init();


   $scope.next=function(){
     console.log('hello');
     let option = 'select',
     page = $scope.pageNUmber;
     $scope.pageNUmber++
     //page = isNaN(page)? 0 : page;
     console.log('$scope.pageNUmber', $scope.pageNUmber);
     console.log('page', page);
        // if(option=='fix')
        // $scope.pagginationSelect=page;

        $scope.currentPagination=page;
        var minD=page*8,maxD=minD+8;
        $scope.getDashBoardDataPage=[];
        $scope.getDashBoardData.forEach((entry,index)=>{
        if(index>=minD && index<maxD && entry.serviceName != 'Complaint Registration')
        
            $scope.getDashBoardDataPage.push(entry);
        });
  }

  $scope.prev=function(){
    console.log('hello');
    let option = 'select';
   -- $scope.pageNUmber;
    page = $scope.pageNUmber;
   
    //page = isNaN(page)? 0 : page;
    console.log('$scope.pageNUmber', $scope.pageNUmber);
    console.log('page', page);
       // if(option=='fix')
       // $scope.pagginationSelect=page;

       $scope.currentPagination=page;
       var minD=page*8,maxD=minD+8;
       $scope.getDashBoardDataPage=[];
       $scope.getDashBoardData.forEach((entry,index)=>{
       if(index>=minD && index<maxD && entry.serviceName != 'Complaint Registration')
     
           $scope.getDashBoardDataPage.push(entry);
       });
 }

})