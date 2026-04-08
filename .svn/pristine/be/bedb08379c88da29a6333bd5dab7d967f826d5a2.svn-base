angular.module('starter')

  .controller('DissConnPayCTRL', function ($scope, $location, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, dateFilter, $state, $localStorage,$sessionStorage) {
	  $scope.data = {};
	  console.log("$localStorage.macAddress---"+JSON.stringify($localStorage.macAddress));
		$scope.orgid = $localStorage.selectedorgID;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
		$scope.emailId = $localStorage.responselogindata.emailId;
    $sessionStorage.serviceCode = "WCC";
	  $scope.ServiceShortName = "WCC";

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

     //get deparment id
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

		console.log("$localStorage.Bankresponse--"+$localStorage.Bankresponse);
		$scope.FlatRate = $sessionStorage.responseservicechargedata.responseObj[0].chargeAmount;
		$scope.options = new Array();
		for(var i=0;i<$sessionStorage.Bankresponse.list.length;i++){
        $scope.options.push({
        id : $sessionStorage.Bankresponse.list[i].bankId,
        name : $sessionStorage.Bankresponse.list[i].cbbankname
      })
  	}

		for(var i=0;i<$sessionStorage.connectiondetail.length;i++){
			var applicantTitle = $sessionStorage.connectiondetail[i].csTitle;
			var applicantFirstName = $sessionStorage.connectiondetail[i].csName;
			var applicantMiddleName = $sessionStorage.connectiondetail[i].csMname;
			var applicantLastName = $sessionStorage.connectiondetail[i].csLname;
			var mobileNo = $sessionStorage.connectiondetail[i].csContactno;
			var bplNo = $sessionStorage.connectiondetail[i].bplNo;
			var housingComplexName = $sessionStorage.connectiondetail[i].csBldplt;
			var roadName = $sessionStorage.connectiondetail[i].csRdcross;
			var areaName = $sessionStorage.connectiondetail[i].csAdd;
			var csIdn = $sessionStorage.connectiondetail[i].csIdn;
			var csApldate = $sessionStorage.connectiondetail[i].csApldate;
		}

 $scope.savedata = function(){
  $ionicLoading.show({template: $filter('translate')('LOADING')});
    var saveDisccDto = {
        fName: applicantFirstName,
        mName: applicantMiddleName,
        lName: applicantLastName,
        mobileNo: mobileNo,
        phone: mobileNo,
        email: null,
        orgId: $scope.orgid,
        deptId: $sessionStorage.deptId,
        empId: null,
        applicationId: null,
        challanNo: null,
        txnId: null,
        licenseNo: null,
        serviceId: $sessionStorage.serviceId,
        userId: $scope.userID,
        langId: 1,
        payStatus: null,
        payAmount: null,
        macId: null,
        updatedBy: null,
        serviceShortCode: null,
        tenant: null,
        documentList: null,
        dirPath: null,
        titleId: null,
        blockNo: null,
        floor: null,
        wing: null,
        bldgName: null,
        houseComplexName: null,
        roadName: null,
        areaName: null,
        pincodeNo: null,
        applicationType: null,
        phone1: null,
        phone2: null,
        wardNo: null,
        bplNo: null,
        gender: null,
        aadhaarNo: null,
        zoneNo: null,
        blockName: null,
        flatBuildingNo: null,
        cityName: null,
        uid: null,
        free: false,
        idfId: null,
        status: null,
        departmentName: null,
        referenceId: null,
        isBPL: null,
        yearOfIssue: null,
        bplIssuingAuthority: null,
        apmOrgnName: null,
        apmMode: null,
        ccnNumber: null,
        binder: null,
        folio: null,
        meterSize: null,
        ccnSize: null,
        ownership: null,
        applicationDate: null,
        locId: null,
        connectionNo: null,
        freeService: false,
        uploadDocument: $sessionStorage.documentObjectArray,
        disconnectionDto: {
          discId: 0,
          csIdn: csIdn,
          apmApplicationId: null,
          discAppdate: $sessionStorage.startDate,
          discReason: $sessionStorage.discconectionReson,
          discType: $sessionStorage.disccType,
          discMethod: null,
          discGrantFlag: null,
          discAprvdate: null,
          discApprovedby: null,
          discExecdate: null,
          orgId: $scope.orgid,
          userId: $scope.userID,
          langId: 0,
          lmodDate: $sessionStorage.startDate,
          updatedBy: null,
          updatedDate: null,
          lgIpMac: $localStorage.macAddress,
          lgIpMacUpd: null,
          wlbWrPrflg: null,
          wtV2: null,
          wtV3: null,
          wtV4: null,
          wtV5: null,
          wlbWkno: null,
          wtN2: null,
          wtN3: null,
          wtN4: null,
          wtN5: null,
          wlbWkdt: null,
          wtD2: null,
          wtD3: null,
          wtLo1: null,
          wtLo2: null,
          wtLo3: null,
          plumId: null,
          disconnectFromDate: null,
          disconnectToDate: null,
          fileList: []
        },
        applicantDetailsDto: {
          organizationName: null,
          applicantFirstName: applicantFirstName,
          applicantMiddleName: applicantMiddleName,
          applicantLastName: applicantLastName,
          gender: null,
          mobileNo: mobileNo,
          emailId: $scope.emailId,
          pinCode: $sessionStorage.pinCode,
          buildingName: null,
          roadName: null,
          applicantTitle: $sessionStorage.Title,
          areaName: $sessionStorage.Address2,
          blockName: null,
          housingComplexName: null,
          wing: null,
          floorNo: null,
          phone1: null,
          phone2: null,
          contactPersonName: null,
          villageTownSub: null,
          cfcCitizenId: null,
          povertyLine: null,
          orgId: $scope.orgid,
          langId: 1,
          userId: $scope.userID,
          bplNo: null,
          flatBuildingNo: null,
          codTryId1: null,
          codTryId2: null,
          codTryId3: null,
          codTryId4: null,
          codTryId5: null,
          aadharNo: null,
          dwzid1: $sessionStorage.Zone,
          dwzid2: $sessionStorage.Ward,
          dwzid3: null,
          dwzid4: null,
          dwzid5: null,
          serviceId: null,
          departmentId: null,
          isBPL: $sessionStorage.PovertyLine,
          panNo: null
        },
        connectionInfo: null,
        consumerName: null
       }
	  RestService.disconnsave(saveDisccDto).then(function (disconnresponse){
      console.log("disconnresponse----"+JSON.stringify(disconnresponse));
         if(disconnresponse.status == "success"){

           $sessionStorage.applictNo = disconnresponse.applicationNo;
           $scope.feesId = {
                       1 : $scope.FlatRate
                     }
          RestService.savePayReqWCU($scope.orgid,$scope.userID,$localStorage.langID,$localStorage.responselogindata.emailId,$scope.loginUSername,$scope.LoginMobileNo,
               $scope.ServiceShortName,$sessionStorage.applictNo,$scope.FlatRate,$scope.paymentGateway,$sessionStorage.applictNo,"Y","N",false,null,$scope.feesId)
            .then(function (response) {
              console.log(response.status);
                if(response.status == "pending"){
  //								alert(response.payRequestMsg);
                  var H= null;

                  H = window.open(encodeURI(response.payRequestMsg), '_blank',
                  'location=no,closebuttoncaption=Back,hardwareback=yes,fullscreen=yes,zoom=yes,toolbarposition=top,enableviewportscale=yes');

                  H.addEventListener('exit', iabClose);
                  H.addEventListener('loadstop', iabClose1);
                  function iabClose(event)
                  {
                    H.removeEventListener('exit', iabClose);
                    $state.go("app.WaterModule");
                  }
                  function iabClose1(event){
                    if (event.url.match("mobile/close")) {
                      H.close();
                      H.removeEventListener('loadstop', iabClose1);
                      $state.go("app.WaterModule");
                    }
                  }
                }
                else{
                    toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
                  }
                $ionicLoading.hide();
              }, function (err){
                toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
                $ionicLoading.hide();
              })
            $ionicLoading.hide();
          }
            else{
              toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
              $ionicLoading.hide();
            }
        },function (err){
            toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
            $ionicLoading.hide();
          })
        };

  }) /*controler ends*/

