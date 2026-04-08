angular.module('starter')

	.controller('reopenTokenCtrl', function ($scope, $rootScope, RestService, $ionicLoading, $stateParams, $ionicPopup,
		toaster, $filter, ENV, $state, $localStorage, $sessionStorage, $ionicHistory, $ionicScrollDelegate) {

		$scope.orgid = $localStorage.selectedorgID;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
		$scope.tokenNumber = "";
		$scope.reply = "";
		$scope.data = {};
		$scope.selectfilename;
		$scope.encoded_file;
		$scope.langID = $localStorage.langID;
		console.log("allgrievance--->" + JSON.stringify($sessionStorage.allgrievanceresponse));
		var allgrievanceresponse = $sessionStorage.allgrievanceresponse;

		console.log("allgrievanceresponse " + allgrievanceresponse);

		if (allgrievanceresponse != "") {
			for (var i = 0; i < allgrievanceresponse.length; i++) {
				if ($sessionStorage.SelectedTask == allgrievanceresponse[i].complaintId) {
					$scope.complaintID = allgrievanceresponse[i].complaintId
					$scope.tokenNumber = allgrievanceresponse[i].applicationId;
					$scope.department = $scope.langID == "1" ? allgrievanceresponse[i].departmentComplaintDesc : allgrievanceresponse[i].departmentComplaintDescReg;
					$scope.complainttype = $scope.langID == "1" ? allgrievanceresponse[i].complaintTypeDesc : allgrievanceresponse[i].complaintTypeDescReg;
					$scope.compdesc = allgrievanceresponse[i].description
					if(allgrievanceresponse[i].status == 'CLOSED'){
						$scope.status = 'Closed';
					} else if (allgrievanceresponse[i].status == 'PENDING'){
						$scope.status = 'Pending';
					} else{
						$scope.status = allgrievanceresponse[i].status;
					}
					
				}
			}
		} else {

			var confirmPopup = $ionicPopup.show({

				title: $filter('translate')('message'),
				template: 'Closed Request Not Found',

				buttons: [
					{
						text: 'Ok',
						type: 'button button-block  customBgColor',
						onTap: function () {
							$state.go("app.home");
							//					            	 ionic.Platform.exitApp();
						}
					}]
			});

		}

		console.log("$sessionStorage.actionhistoryresponse--" + $sessionStorage.actionhistoryresponse);
		var actionhistoryresponse = $sessionStorage.actionhistoryresponse;
		var tempTest = 0;
		if (actionhistoryresponse.length >= 0) {

			$scope.actionhistory = [];
			for (var i = 0; i < actionhistoryresponse.length; i++) {
				$scope.actionhistory.push({
					datetime: formatDate(actionhistoryresponse[i].dateOfAction),
					action: actionhistoryresponse[i].decision,
					empName: actionhistoryresponse[i].empName,
					designation: $scope.langID == "1" ? actionhistoryresponse[i].empGroupDescEng : actionhistoryresponse[i].empGroupDescReg,
					Email: actionhistoryresponse[i].empEmail,
					remarks: actionhistoryresponse[i].comments,
				})
			}
		}


		/*var counter = 1;
		
		var tempvar = '<tr>'+
			'<th>Sr.No</th>'+
			'<th>Date</th>'+
			'<th>Action</th>'+
			'<th>Employee Name</th>'+
			'<th>Email</th>'+
			'<th>Designation</th>'+
			'<th>Remarks</th>'+
			'</tr>';
		var usagedoctable = "";
		for (var i = 0; i < actionhistoryresponse.length; i++) {
		
				var date = formatDate(actionhistoryresponse[i].dateOfAction);
				var fname = actionhistoryresponse[i].actor.fname;
				var lname = actionhistoryresponse[i].actor.lname;
		//		var fullname = fname.concat(lname);
				var fullname = fname+ " " +lname;
				var comments = capitalise(actionhistoryresponse[i].decision);
		
			tempvar = tempvar +
			'<td><span>'+ counter++ +'</span></td>'+
			'<td><span>'+ date +'</span></td>'+
			'<td><span>'+ fullname +'</span></td>'+
			'<td><span>'+ comments +'</span></td>'+
			'</tr>';
		
			var date = formatDate(actionhistoryresponse[i].dateOfAction);
			var action = actionhistoryresponse[i].decision;
			var fullname = actionhistoryresponse[i].empName;
			var email = actionhistoryresponse[i].empEmail;
			var designation = actionhistoryresponse[i].empGroupDescEng;
			var remarks = actionhistoryresponse[i].comments;
		
			tempvar = tempvar +
			'<td><span>'+ counter++ +'</span></td>'+
			'<td><span>'+ date +'</span></td>'+
			'<td><span>'+ action +'</span></td>'+
			'<td><span>'+ fullname +'</span></td>'+
			'<td><span>'+ email +'</span></td>'+
			'<td><span>'+ designation +'</span></td>'+
			'<td><span>'+ remarks +'</span></td>'+
			'</tr>';
		
		}
		
		var tempvar = '<table class="gridtable">'+tempvar+'</table>';
		document.getElementById('ReplyDocIDData').innerHTML = tempvar;*/

		/*function start*/

		$scope.compdescription = false;




		$scope.tokenNumber;
		$scope.reopencomplaint = function () {
			$scope.tokenNumber;
			console.log("$scope.tokenNumber---" + $scope.tokenNumber);
			if ($localStorage.langID == "2") {
				$ionicLoading.show({ template: 'लोड हो रहा है...' });
			} else {
				$ionicLoading.show({ template: 'Loading...' });
			}
			RestService.getCareRequestByRequestNo($scope.tokenNumber).then(function (response) {
				console.log("response=", response);

				if (response == undefined || response == null || response == "") {
					$ionicLoading.hide();
					return false;
				}
				else {
					console.log("compdescription");
					$sessionStorage.RequestNoresponse = response;
					$scope.compdescription = true;
					$ionicScrollDelegate.scrollBottom();
				}
				$ionicLoading.hide();
			}, function (err) {
				toaster.error($filter('translate')('REOPENCOMPLAINTERROR')/* , $filter('translate')('ERROR') */);
				$ionicLoading.hide();
			})
		}

		$scope.reopencompsave = function () {
			var complaintType = "Reopen Complaint";
			console.log("selectfilename=--" + $scope.selectfilename);
			console.log("$scope.encoded_file=--" + $scope.encoded_file);

			$scope.uploadeddoc = arrayListTest;
			if ($localStorage.langID == "2") {
				$ionicLoading.show({ template: 'लोड हो रहा है...' });
			} else {
				$ionicLoading.show({ template: 'Loading...' });
			}
			RestService.reopenedSaveGrievances($sessionStorage.RequestNoresponse, $scope.data.reply, $scope.orgid, $scope.userID,
				$scope.tokenNumber, $scope.uploadeddoc, $scope.data.reOpeningRemark, $scope.LoginMobileNo).then(function (response) {
					if (response.response == "SUCCESS") {

						$scope.requestNo = response.responseData.requestNo;
						$scope.decision = response.responseData.decision;

						var confirmPopup = $ionicPopup.show({

							title: $filter('translate')('message'),
							template: $filter('translate')('COMPNUMBERIS') + $sessionStorage.RequestNoresponse.complaintId + " " + $filter('translate')('ISSUCCESS') + " " + $filter('translate')('REOPENED') + '</b>',
							buttons: [{
								text: $filter('translate')('OK'),
								type: 'button button-block  customBgColor',
								onTap: function () {
									$sessionStorage.reopensavedata = response;
									$state.go("app.home");

									console.log("$sessionStorage.RequestNoresponse---" + JSON.stringify($sessionStorage.RequestNoresponse));
									$scope.NewCompDeptdetails = $sessionStorage.RequestNoresponse.departmentComplaint;
									$scope.NewCompType = $sessionStorage.RequestNoresponse.complaintType;
									/*     	 RestService.escalation($scope.NewCompDeptdetails,$scope.NewCompType,$scope.orgid)
												 .then(function (escresponse) {
													 if(escresponse==undefined || escresponse == null || escresponse=="")
													   {
															  return false;
															  $ionicLoading.hide();
													   }
													   else
													   {
														   $sessionStorage.escresponse = escresponse;
															 $state.go("app.complaintreceipt");
																 $ionicLoading.hide();
													   }
													 $ionicLoading.hide();
												 },
												 function (err) {
													 $ionicLoading.hide();
													 toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
												 })*/

									RestService.getGrievanceStatus($sessionStorage.RequestNoresponse.applicationId, $localStorage.langID).then(function (escresponse) {
										if (escresponse == "" || escresponse == undefined || escresponse == null) {
											return false;
											$ionicLoading.hide();
										} else {
											$sessionStorage.escresponse = escresponse;
											$state.go("app.complaintreceipt");
										}
										$ionicLoading.hide();
									}, function (err) {
										$ionicLoading.hide();
										toaster.error($filter('translate')('REOPENCOMPLAINTERROR')/* , $filter('translate')('ERROR') */);
									})
									$ionicLoading.hide();
								}
							}]
						});

					}
					else {
						console.log('testing 1');
						//toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
						toaster.error(response.responseData.errorMessage);
						$ionicLoading.hide();
					}
					$ionicLoading.hide();
				}, function (err) {
					toaster.error($filter('translate')('REOPENCOMPLAINTERROR')/* , $filter('translate')('ERROR') */);
					$ionicLoading.hide();
				})
		}

		var arrayListTest = [];

		$scope.imageupload = function (fileObject) {
			if ($localStorage.langID == "2") {
				$ionicLoading.show({ template: 'लोड हो रहा है...' });
			} else {
				$ionicLoading.show({ template: 'Loading...' });
			}
			var verfy = document.getElementById('verfiyFile').files[0];
			$scope.selectfilename = verfy.name;
			var reader = new FileReader();
			var maxSize = fileObject.getAttribute('data-max-size');
			var fileSize = verfy.size;
			var ext = fileObject.value.split('.').pop();
			if (ext) {
				if (ext == "pdf" || ext == "docx" || ext == "doc" || ext == "jpeg" || ext == "jpg" || ext == "png" || ext == "gif") {
				}
				else {
					fileObject.value = "";
					$ionicLoading.hide();
					$rootScope.simpleAlert('Onlypdfdocxls');
					return;
				}
			} else {
				$rootScope.simpleAlert('validdocument');
				$ionicLoading.hide();
				return;
			}
			if (fileSize > maxSize) {
				fileObject.value = "";
				$rootScope.simpleAlert('validdocumentSize');
				$ionicLoading.hide();
				return;
			}

			reader.onload = function (e) {
				//	$scope.encoded_file ="Testing";
				console.log("about to encode");
				$scope.encoded_file = window.btoa(e.target.result.toString());
				console.log("encoded byte--" + $scope.encoded_file);
				var documentObject =
				{
					attachmentId: null,
					documentId: null,
					documentName: verfy.name,
					documentSerialNo: null,
					descriptionType: null,
					documentType: null,
					doc_DESC_Mar: null,
					doc_DESC_ENGL: null,
					documentByteCode: $scope.encoded_file,
					checkkMANDATORY: null
				};
				arrayListTest.push(documentObject);
				console.log("TempArray-----" + JSON.stringify(arrayListTest))
			};
			reader.onloadend = function () {
				$ionicLoading.hide();
			};
			reader.readAsBinaryString(verfy);
		}
		$scope.reopencompreset = function (){
			$scope.data.reply = null   
			$scope.data.reOpeningRemark = null
			$scope.data.Document = null
			//$scope.data.reOpeningRemark = null
			//$scope.reOpeningOption = null
		}
		var _init = function () {
			if ($localStorage.langID == "2") {
				$ionicLoading.show({ template: 'लोड हो रहा है...' });
			} else {
				$ionicLoading.show({ template: 'Loading...' });
			}
			RestService.getNHPrefixData("RRN", $scope.orgid).then(function (response) {
				$scope.reOpeningOption = new Array();
				for (i = 0; i < response.length; i++) {
					if ($localStorage.langNewId == "2") {
						$scope.reOpeningOption.push({
							id: response[i].lookUpId,
							name: response[i].descLangSecond
						})
					} else {
						$scope.reOpeningOption.push({
							id: response[i].lookUpId,
							name: response[i].descLangFirst
						})
					}
				}
				$ionicLoading.hide();
			}, function (err) {
				$ionicLoading.hide();
				toaster.error($filter('translate')('REOPENCOMPLAINTERROR')/* , $filter('translate')('ERROR') */);
			})
		};
		_init();
	});
