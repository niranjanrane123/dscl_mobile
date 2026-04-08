angular.module('starter')

  .controller('NewWaterconnInfoCTRL', function ($rootScope,$scope, $location, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, dateFilter, $state,$localStorage,$sessionStorage,$rootScope) {
	  $scope.data_ = {};
  $sessionStorage.serviceCode = "WNC";
	console.log("$sessionStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
//		$scope.orgid = $localStorage.responselogindata.orgId;
    var tempTest;
    $sessionStorage.WNCName = null;
    $sessionStorage.WNCmobile  = null;
    $sessionStorage.WNCemailid = null;
    $sessionStorage.documentObjectArray = null;
    $scope.data_.WNCaddress = null;
    $sessionStorage.WNCpincode = null;
    $sessionStorage.isConsumer = null;
    $sessionStorage.isBilling = null;
    $sessionStorage.WNCPropertyNo = null;
    $sessionStorage.WNCBpl = null;
    $sessionStorage.WNCConnSize = null;
    $sessionStorage.WNCPlumber = null;
    $sessionStorage.WNCZone = null;
    $sessionStorage.WNCWard = null;
    $sessionStorage.WNCtarif = null;
    $sessionStorage.WNCIsTaxPayer = null;
    $sessionStorage.WNCtemporary = null;
    $sessionStorage.CNCpincode = null;
    $sessionStorage.WCPropertyOutstanding = null;
    $sessionStorage.WMNCUsageType = null;
    $sessionStorage.WNCbplno = null;
    $sessionStorage.ExitstingConnections = null;

		$scope.userID = $localStorage.responselogindata.userId;
		$scope.orgid = $localStorage.selectedorgID;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
		$sessionStorage.lookUpCodeAPL = "APL";
		$scope.myCheckbox = true;
    $scope.corresPondence = { checked: true };
		 $scope.changeAttr = function(item){
				if($scope.data_.WNCfromdate == "" || $scope.data_.WNCfromdate == null || $scope.data_.WNCfromdate == undefined )
					item.currentTarget.setAttribute("placeholder","From Date");
				else item.currentTarget.setAttribute("placeholder","");
			}
		  $scope.tochangeAttr = function(item){
				if($scope.data_.WNCtodate == "" || $scope.data_.WNCtodate == null || $scope.data_.WNCtodate == undefined )
					item.currentTarget.setAttribute("placeholder","To Date");
				else item.currentTarget.setAttribute("placeholder","");
			}
		  $scope.twelveLimitInput = function()
		  {
		  	var mobileno = document.getElementById("adharNO").value;
		  	var inputVal = mobileno;
		  	    var numericReg = /^[0-9]{1,12}$/;
		  	    if(!numericReg.test(inputVal) || inputVal.length>12)
		  	    {
		  	    	inputVal.slice(0,-1);
		  	    	var inputValSlice = inputVal.slice(0,-1);
		  	    	document.getElementById("adharNO").value = inputValSlice;
		  	    }
		  }

      $scope.billinghide = true;
        $scope.checkedOrNot = function (addinfochecked) {

            if (addinfochecked) {
                $scope.billinghide = false;
            } else {
               $scope.billinghide = true;
            }
        };

		  $scope.tenLimitInputBpl = function()
		  {
		  	var mobileno = document.getElementById("mobileno").value;
		  	var inputVal = mobileno;
		  	    var numericReg = /^[0-9]{1,10}$/;
		  	    if(!numericReg.test(inputVal) || inputVal.length>10)
		  	    {
		  	    	inputVal.slice(0,-1);
		  	    	var inputValSlice = inputVal.slice(0,-1);
		  	    	document.getElementById("mobileno").value = inputValSlice;
		  	    }
		  }

		  $scope.sixteenLimitBpl = function()
		  {
		  	var bplNumber = document.getElementById("bplNumber").value;
		  	var inputVal = bplNumber;
		  	    var numericReg = /^[A-Za-z0-9/s,.'-@]{1,16}$/;
		  	    if(!numericReg.test(inputVal) || inputVal.length>16)
		  	    {
		  	    	inputVal.slice(0,-1);
		  	    	var inputValSlice = inputVal.slice(0,-1);
		  	    	document.getElementById("bplNumber").value = inputValSlice;
		  	    }
		  }

		  $scope.permttemp = {};
		       if($localStorage.english){
		           $scope.permttemp = [
                    { value: "P", label: "Permanent" }
                    ,
                    { value: "T", label: "Temporary" }
                ];
		       }else{
		           $scope.permttemp = [
                    { value: "P", label: "स्थायी" }
                    ,
                    { value: "T", label: "अस्थायी" }
                ];
		       }

	        $scope.WNCtemporary = $scope.permttemp[0].value;

		  //get BPL
       var lookUpCode  = "YNC";
          RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (bplResponse2){
            console.log("gettitle=="+JSON.stringify(bplResponse2));
            if(bplResponse2==undefined || bplResponse2 == null || bplResponse2=="")
            {

              $ionicLoading.hide();
               return false;
            }
          else
           {
            $scope.bpldata = new Array();
             for(var i=0;i<bplResponse2.length;i++){
              if($localStorage.langNewId == "1"){
                  $scope.bpldata.push({
                      id : bplResponse2[i].lookUpCode,
                      value : bplResponse2[i].descLangFirst
                  })
                 }else{
                  $scope.bpldata.push({
                      id : bplResponse2[i].lookUpCode,
                      value : bplResponse2[i].descLangSecond
                    })
                 }
               }
              $ionicLoading.hide();
            }
          },function (err) { toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR')); })

    /*prefix data start*/

	  $rootScope.getNonHData("APT","aptoptions",$scope.orgid);

	   /* $scope.aptoptions = new Array();
		   for(var i=0;i<$sessionStorage.response.length;i++){
				$scope.aptoptions.push({
				aptid : $sessionStorage.response[i].lookUpId,
				aptvalue: $sessionStorage.response[i].descLangFirst,
				aptname : $sessionStorage.response[i].descLangFirst
			   })
		    } */

        $scope.checkTime = function(outTime){
        $ionicLoading.show({
        					template: 'Please wait...'
        				});
          	RestService.getPropertyDetails($scope.propertyNO,$scope.orgid).then(function (responseWWZ) {
          				  console.log("get property details"+JSON.stringify(responseWWZ));
          				  $ionicLoading.hide();
          				  if(responseWWZ==undefined || responseWWZ == null || responseWWZ=="")
          				  {
          				  	 return false;
          				  }
          				  else
          				  {
                      $scope.data_.propertyOutStanding = responseWWZ.totalOutsatandingAmt;
                      $scope.data_.WNCownername = responseWWZ.primaryOwnerName;
                      $scope.data_.WNCaddress = responseWWZ.address;
                      $scope.data_.emailid = responseWWZ.ownerEmail;
                      if(responseWWZ.ownerEmail == null || responseWWZ.ownerEmail == ""){
                        $scope.data_.emailid = ""
                      }else{
                        $scope.data_.emailid = responseWWZ.ownerEmail;
                      }
                      $scope.data_.mobile = parseInt(responseWWZ.primaryOwnerMobNo);
                      $sessionStorage.WNCPropertyNo = responseWWZ.propNo;
                      $sessionStorage.WMNCUsageType = responseWWZ.uasge;
                      $scope.data_.WNCpincode = responseWWZ.pinCode;
                      //$scope.WNCgender = responseWWZ.gender
                      if(responseWWZ.gender == "M"){
                        $scope.data_.WNCgender = "Male"
                      }else{
                        $scope.data_.WNCgender = "Female"
                      }
//                      $scope.data_.propertyOutStanding = responseWWZ.totalOutsatandingAmt;
//                      $scope.data_.propertyOutStanding = responseWWZ.totalOutsatandingAmt;
//                      $scope.data_.propertyOutStanding = responseWWZ.totalOutsatandingAmt;
//                      $scope.data_.propertyOutStanding = responseWWZ.totalOutsatandingAmt;
          				  }
          				},function (err){
          					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
          					$ionicLoading.hide();
          				})
              console.log("catching")
            }

            $scope.selectzone= function(){
              console.log($scope.WNCZone);
              $scope.$watch('WNCZone', function(newVal) {
                var lookUpCode = "WWZ";
                var level = "2";
                RestService.getHPrefixData(lookUpCode,level,$scope.orgid).then(function (resposeward){
                 console.log("resposeward=="+JSON.stringify(resposeward));
                 $scope.wardoptions = new Array();
                 for(var i=0;i<resposeward.length;i++)
                    if(resposeward[i].lookUpParentId == $scope.data_.WNCZone)
                      {
                        if($localStorage.english){
                          console.log("resposeward=="+resposeward[i]);
                            $scope.wardoptions.push({
                            wardid : resposeward[i].lookUpId,
                            wardname : resposeward[i].descLangFirst
                          })
                        }else{
                           console.log("resposeward=="+resposeward[i]);
                            $scope.wardoptions.push({
                            wardid : resposeward[i].lookUpId,
                            wardname : resposeward[i].descLangSecond
                          })
                        }

                    }
                 },function (err){				})
              });
            };


					  //$scope.WNCselecttitle = $localStorage.responselogindata.title;
//					  $("#ttloptions").val($scope.WNCselecttitle).change();
//					  $sessionStorage.WNCselecttitle = $scope.WNCselecttitle;
//					  $scope.WNCFirstname = $localStorage.responselogindata.firstName;
//					  $sessionStorage.WNCFirstname = $scope.WNCFirstname;
//					  $scope.WNCMiddlename = $localStorage.responselogindata.middleName;
//					  $sessionStorage.WNCMiddlename = $scope.WNCMiddlename;
//					  $scope.WNCLastname = $localStorage.responselogindata.lastName;
//					  $sessionStorage.WNCLastname = $scope.WNCLastname;
            $sessionStorage.WNCName = $scope.data_.WNCownername;
					  //$scope.WNCgender = $rootScope.fullGender($localStorage.responselogindata.gender);


					  $sessionStorage.WNCgender = $scope.data_.WNCgender;
					  //$scope.WNCmobile = $localStorage.responselogindata.mobileNo;
					  $sessionStorage.WNCmobile = $scope.data_.mobile;
					  //$scope.WNCemailid = $localStorage.responselogindata.emailId;
					  $sessionStorage.WNCemailid = $scope.data_.emailid;
					  //$scope.WNCaadharnumber = $localStorage.responselogindata.addhaarNo;
					  $sessionStorage.WNCaadharnumber = $scope.data_.WNCaadharnumber;
					  $sessionStorage.WNCpincode = $scope.data_.WNCpincode;
					  $sessionStorage.WNCBpl =  $scope.data_.WNCBpl;
					  //$scope.WNCbplno = $localStorage.responselogindata;
					  $sessionStorage.WNCbplno = $scope.data_.WNCbplno;

	      /*prefix data end*/

      $scope.applicantinfo = function() {
        var mobileno1 = document.getElementById("mobileno").value;
        var emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if(/^\s|\s$/.test(mobileno1) || !(/^[0-9]{1,10}$/.test(mobileno1)) || mobileno1.length != 10)
        {
          $rootScope.simpleAlert("Please Enter a Valid Mobile Number");
          return;
        }

            $scope.WNCapplicantype;
            $sessionStorage.WNCapplicantype = null;
            if($scope.myCheckbox){
              $sessionStorage.isConsumer = "Y"
            }else{
              $sessionStorage.isConsumer = "N"
            }
//				   alert("$sessionStorage.WNCapplicantype--"+$sessionStorage.WNCapplicantype)
            var sel = document.getElementById("apltype");
            //apptypetext= sel.options[sel.selectedIndex].text;
            $sessionStorage.apptypetext = "NA";
            $scope.data_.WNCorgname;
            $sessionStorage.WNCorgname = $scope.data_.WNCorgname;
            $scope.WNCtemporary;
            $sessionStorage.WNCtemporary = $scope.WNCtemporary;
            $scope.data_.WNCfromdate;
            $sessionStorage.WNCfromdate = $scope.data_.WNCfromdate;
            $scope.data_.WNCtodate;
            $sessionStorage.WNCtodate = $scope.data_.WNCtodate;
            $sessionStorage.WCPropertyOutstanding = $scope.data_.propertyOutStanding;
            $sessionStorage.WNCName = $scope.data_.WNCownername;
            $sessionStorage.WNCgender = $scope.data_.WNCgender;
            $sessionStorage.WNCmobile = $scope.data_.mobile;

            $sessionStorage.WNCemailid = $scope.data_.emailid;
            //$scope.WNCaadharnumber = $localStorage.responselogindata.addhaarNo;
            $sessionStorage.WNCaadharnumber = $scope.data_.WNCaadharnumber;
            $sessionStorage.WNCpincode = $scope.data_.WNCpincode;
            $sessionStorage.WNCBpl =  $scope.WNCBpl;
            console.log("is bpl"+$sessionStorage.WNCBpl);
            //$scope.WNCbplno = $localStorage.responselogindata;
            if($scope.WNCBpl == 'N'){
            $sessionStorage.WNCbplno = null;
            }else{
            $sessionStorage.WNCbplno = $scope.WNCbplno;
            }

            $sessionStorage.CNCName = $scope.data_.CNCownername;
            //$scope.WNCgender = $rootScope.fullGender($localStorage.responselogindata.gender);


            $sessionStorage.CNCgender = $scope.data_.CNCgender;
            //$scope.WNCmobile = $localStorage.responselogindata.mobileNo;
            $sessionStorage.CNCmobile = $scope.data_.CNCmobile;
            //$scope.WNCemailid = $localStorage.responselogindata.emailId;
            $sessionStorage.CNCemailid = $scope.data_.CNCemailid;
            //$scope.WNCaadharnumber = $localStorage.responselogindata.addhaarNo;
            $sessionStorage.CNCaadharnumber = $scope.data_.CNCaadharnumber;
            $sessionStorage.CNCpincode = $scope.data_.CNCpincode;

            if($scope.billinghide){
               $sessionStorage.CNCbilladdress = $scope.data_.WNCbilladdress;
               $sessionStorage.isBilling = null;
            }else{
               $sessionStorage.CNCbilladdress = $scope.data_.WNCaddress;
               $sessionStorage.isBilling = 'Billing';
            }



            $scope.data_.WNCZone;
            $sessionStorage.WNCZone = $scope.data_.WNCZone;
            $scope.data_.WNCWard;
            $sessionStorage.WNCWard =  $scope.data_.WNCWard;
            if($scope.data_.propertyOutStanding > 0 && $scope.WNCBpl == 'N'){
              $rootScope.simpleAlert("property outstanding is pending")
            }else{
              $state.go("app.NWCExistConndetails");
            }
	    };


	var init_ = function()
	{
		$rootScope.getNonHData("GEN","genoptions",$scope.orgid);
		$rootScope.getNonHData("TTL","ttloptions",$scope.orgid);

    //get deparment id
      RestService.getDepartId($scope.orgid,$sessionStorage.serviceCode)
        .then(function (response) {
        console.log("service id response"+JSON.stringify(response));
        $ionicLoading.hide();
        $sessionStorage.deptId = response;

        console.log("DEPRTMENT ID "+response)
      }, function (err) {
        $ionicLoading.hide();
        toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
      })

      //get service id
      RestService.getServiceId($scope.orgid,$sessionStorage.serviceCode)
        .then(function (response) {
        console.log("service id response"+JSON.stringify(response));
        $ionicLoading.hide();
        $sessionStorage.serviceId = response;

        console.log("DEPRTMENT ID "+response)
      }, function (err) {
        $ionicLoading.hide();
        toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
      })
		/*
		var lookUpCode = "GEN";
		 RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (getprefixdataresponsegen) {
			  console.log("getprefixdataresponsegen=="+getprefixdataresponsegen);
			  if(getprefixdataresponsegen==undefined || getprefixdataresponsegen == null || getprefixdataresponsegen=="")
			  {
			  	 return false;
			  }
			  else
			  {
				  $sessionStorage.getprefixdataresponsegen = getprefixdataresponsegen;
				  $scope.genoptions = new Array();
					    for(var i=0;i<$sessionStorage.getprefixdataresponsegen.length;i++){
								$scope.genoptions.push({
								genid : $sessionStorage.getprefixdataresponsegen[i].lookUpCode,
								genname : $sessionStorage.getprefixdataresponsegen[i].descLangFirst
						   })
					    }
//					  $state.go("app.NWCApplicantInfo");
				  $ionicLoading.hide();
			  }
			},function (err) {
				toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
				$ionicLoading.hide();
			})

			var lookUpCode = "TTL";
	  	RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (getprefixdataresponsettl) {
			  console.log("getprefixdataresponsettl=="+getprefixdataresponsettl);
			  if(getprefixdataresponsettl==undefined || getprefixdataresponsettl == null || getprefixdataresponsettl=="")
			  {
			  	 return false;
			  }
			  else
			  {
				  $sessionStorage.getprefixdataresponsettl = getprefixdataresponsettl;
				  $scope.ttloptions = new Array();
				    for(var i=0;i<$sessionStorage.getprefixdataresponsettl.length;i++){
							$scope.ttloptions.push({
							ttlid : $sessionStorage.getprefixdataresponsettl[i].lookUpId,
							ttlname : $sessionStorage.getprefixdataresponsettl[i].descLangFirst
					   })
				    }
//				$state.go("app.NWCApplicantInfo");
				  $ionicLoading.hide();
			  }
			},function (err) {
				toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
				$ionicLoading.hide();
			})
			*/
			  var lookUpCode = "WWZ";
		    var level = "1";
		  	RestService.getHPrefixData(lookUpCode,level,$scope.orgid).then(function (responseWWZ) {
				  console.log("getprefixdataresponsettl=="+JSON.stringify(responseWWZ));
				  if(responseWWZ==undefined || responseWWZ == null || responseWWZ=="")
				  {
				  	 return false;
				  }
				  else
				  {
					  $sessionStorage.responseWWZ = responseWWZ;
					  $scope.WWZoptions = new Array();
            for(var i=0;i<$sessionStorage.responseWWZ.length;i++){
              if($localStorage.english){
                 $scope.WWZoptions.push({
                  wwzid : $sessionStorage.responseWWZ[i].lookUpId,
                  wwzname : $sessionStorage.responseWWZ[i].descLangFirst
                 })
              }else{
                $scope.WWZoptions.push({
                  wwzid : $sessionStorage.responseWWZ[i].lookUpId,
                  wwzname : $sessionStorage.responseWWZ[i].descLangSecond
                })
              }
				     }
					  $ionicLoading.hide();
				  }
				},function (err){
					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
					$ionicLoading.hide();
				})


		  $ionicLoading.show({
				template:$filter('translate')('LOADING')
			});

		  var lookUpCode = "TRF";
		  var level = "1";
		  RestService.getHPrefixData(lookUpCode,level,$scope.orgid).then(function (getprefixdataresponseTRF) {
			  console.log("getprefixdataresponseTRF=="+getprefixdataresponseTRF);
			  if(getprefixdataresponseTRF==undefined || getprefixdataresponseTRF == null || getprefixdataresponseTRF=="")
			  {
				  tempTest	=	1;
				  $ionicLoading.hide();
			  	 return false;
			  }
			  else
			  {
				  $sessionStorage.getprefixdataresponseTRF = getprefixdataresponseTRF;
				  if(tempTest==0)
//					  $state.go("app.NWCExistConndetails");
				  $ionicLoading.hide();
			  }
			},function (err) {
				toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
				$ionicLoading.hide();
			})


      var lookUpCode = "CCG";
      var level = "1";
		  RestService.getHPrefixData(lookUpCode,level,$scope.orgid).then(function (getprefixdataresponseCCG) {
				  console.log("getprefixdataresponseCCG=="+getprefixdataresponseCCG);

				  if(getprefixdataresponseCCG==undefined || getprefixdataresponseCCG == null || getprefixdataresponseCCG=="")
				  {
					   $ionicLoading.hide();
				  	 return false;
				  }
				  else
				  {
					  $sessionStorage.getprefixdataresponseCCG = getprefixdataresponseCCG;
//							 $state.go("app.NWCExistConndetails");
					  $ionicLoading.hide();
				  }
				  /*$sessionStorage.getprefixdataresponseCCG = getprefixdataresponseCCG;
				  $ionicLoading.hide();*/
				},function (err) {
					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
				  $ionicLoading.hide();
				})


			var lookUpCode = "CSZ"
		  RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (getprefixdataresponsecsz) {
			 console.log("getprefixdataresponsecsz=="+getprefixdataresponsecsz);
			 if(getprefixdataresponsecsz==undefined || getprefixdataresponsecsz == null || getprefixdataresponsecsz=="")
			  {
				   $ionicLoading.hide();
			  	 return false;
			  }
			  else
			  {
				   $sessionStorage.getprefixdataresponsecsz = getprefixdataresponsecsz;
					 $ionicLoading.hide();

			  }

        },function (err) {
            toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
            $ionicLoading.hide();
        })
	}
	init_();
  }) /*controler ends*/

