
/**
 * @ngdoc service
 * @name starter.RestService
 * @description
 * # RestService
 * Service in the starter.
 */
angular.module('starter')
  .factory('RestService', function (ENV, $http, $localStorage, $sessionStorage, $rootScope) {
    var api = {};
    api.sosApi = ENV.sosApi;
    api.dashBoardUrl = ENV.dashBoardURL;
    api.serviceURL = ENV.baseURL + '/MainetService/rest/'
    //	api.brmsurl = ENV.brmsURL + '/Mainet_BRMS/rest/'
    api.brmsurl = ENV.brmsURL + '/MainetService/'
    api.bpmsurl = ENV.baseURL + '/mainetbpmservice/rest/'
    api.eipUrl = ENV.eipURL + '/dscl/portalrest/' //production //public ip uat
    //api.eipUrl = ENV.eipURL + '/portalrest/' //private ip uat
    api.cxfServiceUrl = ENV.baseURL + '/MainetService/'
    //var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
    api.eipURL = ENV.eipURL;

    api.swmURL = ENV.swMURL;
    api.enviornmentURL = ENV.enviornmentURL;
    api.swmAdminName = ENV.swmAdminName;
    api.swmAdminPassword = ENV.swmAdminPassword;
    var Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9+/=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/rn/g, "n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } }

    // Define the string
    var string = 'Hello World!';

    // Encode the String
    var encodedString = Base64.encode(string);

    /*block chain*/
    api.bloackchain = function (flat) {
      console.log("ikde" + flat)
      var postData = {
        "channel": "assettransfer",
        "chaincode": "cityassetrule",

        "method": "getHistoryForMarble",

        "args": ["Flat1"],

        "chaincodeVer": "v0"
      }

      var authHeader = new Headers();
      var auth = "ganga.vemparala@abmindia.com : Abmoracle#689";
      var encodedString = Base64.encode(auth);
      authHeader.append('Authorization', "Basic Z2FuZ2EudmVtcGFyYWxhQGFibWluZGlhLmNvbTpBYm1vcmFjbGUjNjg5");
      authHeader.append('Content-Type', 'application/json');
      console.log("hedaersss " + encodedString)

      return $http.post("https://54A2FD24794543F5927CDF5F4D172EAE.blockchain.ocp.oraclecloud.com:443/restproxy1/bcsgw/rest/v1/transaction/invocation", postData,
        { headers: authHeader }).then(function (data) {
          return data;
        });
    };

    /*---------WATER MODULE SERVICES----------*/

    /* water bill payment start */
    api.getWPayDet = function (search, orgid) {
      var postData = { ccnNumber: search, orgid: orgid }
      console.log("---postData---" + JSON.stringify(postData))
      return $http.post(api.serviceURL + 'WaterPaymentRestController/getPaymentData', postData).then(function (data) {
        return data.data;
      });
    };


    api.watersavebillpayment = function (CSidn, orgid, userID, Rebatservicechargee, payingAmount, totalPayableAmount) {
      var postData = {
        csIdn: CSidn,
        orgid: orgid,
        userId: userID,
        rebateAmount: Rebatservicechargee,
        amountPaid: payingAmount,
        totalOutstanding: totalPayableAmount,
      }
      console.log("---postData---" + JSON.stringify(postData))
      return $http.post(api.serviceURL + 'WaterPaymentRestController/saveBillPayment', postData).then(function (data) {
        return data.data;
      });
    };

    api.advancewatersavebillpayment = function (CSidn, orgid, userID, Rebate, payingAmount) {
      var postData = {
        csIdn: CSidn,
        orgid: orgid,
        userId: userID,
        rebateAmount: Rebate,
        amountPaid: payingAmount,
        advancePay: "A"
      }
      console.log("---postData---" + JSON.stringify(postData))
      return $http.post(api.serviceURL + 'WaterPaymentRestController/getTaxDetailAndCsIdn', postData).then(function (data) {
        return data.data;
      });
    };

    api.getPayOpt = function (orgid, userID, langID) {
      var postData = { orgId: orgid, userId: userID, langId: 1 }
      console.log("---postData---" + JSON.stringify(postData))
      return $http.post(api.serviceURL + 'mobilePaymentController/getPgList', postData).then(function (data) {
        return data.data;
      });
    };
    api.getRecieptDetails = function (postData) {
      console.log("---postData---" + JSON.stringify(postData))
      return $http.post(api.serviceURL + 'waterNoDueCertificateController/printNoDueCertificate', postData).then(function (data) {
        return data.data;
      });
    };

     // SOS Emergency Call

     api.EmergencySOSCall = function (postData) {
      console.log("---sos data---" + JSON.stringify(postData))
      return $http.post(api.sosApi, postData).then(function (data) {
        return data.data;
      });
    };

// Get LOI application detail
    api.getLOIDetails = function (postData) {
      console.log("---postData---" + JSON.stringify(postData))
      return $http.post(api.serviceURL + 'LoiPaymentController/LoiNumberSearch', postData).then(function (data) {
        return data.data;
      });
    };

 

    // save payment request LOI

    api.loisavePayReq = function (postData) {
     
      console.log("postData loi pay--" + JSON.stringify(postData));
      
      // return $http.post(api.serviceURL + 'commonPaymentController/savePaymentRequest', postData).then(function (data) {

        return $http.post(api.serviceURL + 'mobilePaymentController/savePaymentRequest', postData).then(function (data) {

        // return $http.post("http://192.168.100.60:8085/MainetService/rest/mobilePaymentController/savePaymentRequest", postData).then(function(data) {
        return data.data;
      });
    };

    api.getPayPendingDataByONLTransId = function (params) {
      console.log("loiTransactionBeforePayment URL", api.serviceURL + 'citizenDashboard/getPayPendingDataByONLTransId')
      return $http.post(api.serviceURL + 'citizenDashboard/getPayPendingDataByONLTransId', params).then(function (data) {
        return data.data;
      });
    }

    //////////////////////////////////////
    // api.getPaymenystatus = function (refNo) {
    //   return $http.post(api.serviceURL+'mobilePaymentController/checkPaymentStatus/'+ refNo).then(function (data) {
    //     return data.data;
    //   });
    // }

    api.getPaymenystatus = function (refNo) {
      return $http.post(api.serviceURL+'mobilePaymentController/checkPaymentStatus/'+ refNo).then(function (data) {
        return data.data;
      });
    }
    api.getinsertIntoReceiptMaster = function (postData) {
      return $http.post(api.serviceURL+'ChallanNumberGenerationController/insertIntoReceiptMaster', postData ).then(function (data) {
        return data.data;
      });
    }
    api.GetPlaceFromLayer = function (lat,long) {
      console.log(lat,"rest service lat")
      console.log(long,"rest service long")
      var token = "Bearer" + " " + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjoiZGVocmFkdW4iLCJQYXNzd29yZCI6ImFkbWluQDEyMyIsIlByb2plY3QiOiJzYzEwX2RlaHJhZHVuX3BnIiwiSG9zdCI6IjEwLjY3LjE3MS40NyIsIlBvcnQiOjU0MzIsInR5cGUiOiJQcm9mZXNzaW9uYWwiLCJpYXQiOjE2MTkyNjQxNzMsImF1ZCI6InNnbDpQcm9mZXNzaW9uYWwiLCJpc3MiOiJzZ2wudGxkIn0.qiQihyNiwE6H2XVEa11aWxN3AhFK9U6aCRPFUUYtb30cn9jc4yeTAt4I2jOp5sX3qlsYKNRtB2nkGGSUn7bBm6J33HFQC692LjRaDeTszI6BcNmGJTD9Ewr9nEDJY_0EUub0hC5uafVt0i4kZbCB6saW4P1vRzyGeO7WwKeEuBw"
     // var url = 'https://dsclgis.uk.gov.in:8443/IGISRestAPI/Geocoder/GetPlaceFromLayer/landmark/name/30.360238/78.085136/100/10'
     
      var url = 'https://dsclgis.uk.gov.in:8443/IGISRestAPI/Geocoder/GetPlaceFromLayer/landmark/name/' + lat +"/" + long + "/" + '500/10'
      console.log(url,"my url location....")
      
      return $http.get(url,{
        headers: { 'Authorization': token}
      }).then(function (data) {
        return data.data;
      });
    }
    api.getTransactionAfterPayment = function (postData) {
      return $http.post(api.serviceURL+'commonPaymentController/proceesTransactionAfterPayment',postData).then(function (data) {
        return data.data;
      });
    }
    /////////////////////////////////////

// loi loi process payment
    api.loiTransactionBeforePayment = function (params) {
      return $http.post(api.serviceURL + 'commonPaymentController/proceesTransactionBeforePayment', params).then(function (data) {
        return data.data;
      });
    }

    /*for payment */
    api.savePayReq = function (orgId, userId, langId, emailId, loginUserName, loginMobile, serviceShortName, applicationNo,
      flatRate, paymentType, applicantNo, udF2, chalasnServiceType, documentUploaded, taxId, feesId) {
        
      var postData = {
        orgId: orgId,
        userId: userId,
        langId: parseInt(langId),
        email: emailId,
        applicantName: loginUserName,
        mobileNo: loginMobile,
        serviceShortName: serviceShortName,
        referenceId: applicationNo,
        dueAmt: flatRate,
        bankId: paymentType,
        udf1: applicantNo,
        udf2: udF2,
        challanServiceType: chalasnServiceType,
        documentUploaded: documentUploaded,
        txnId: taxId,
        feeIds: feesId
      };
      console.log("postData pay--" + JSON.stringify(postData));
      return $http.post(api.serviceURL + 'mobilePaymentController/savePaymentRequest', postData).then(function (data) {
        // return $http.post("http://192.168.100.60:8085/MainetService/rest/mobilePaymentController/savePaymentRequest", postData).then(function(data) {
        return data.data;
      });
    };

    api.savePayReqWCU = function (orgId, userId, langId, emailId, loginUserName, loginMobile, serviceShortName, applicationNo,
      flatRate, paymentType, applicantNo, udF2, chalasnServiceType, documentUploaded, taxId, feesId) {
      var postData = {
        orgId: orgId,
        userId: userId,
        langId: parseInt(langId),
        email: emailId,
        applicantName: loginUserName,
        mobileNo: loginMobile,
        serviceShortName: serviceShortName,
        referenceId: applicantNo,
        dueAmt: flatRate,
        bankId: paymentType,
        udf1: applicationNo,
        udf2: udF2,
        challanServiceType: chalasnServiceType,
        documentUploaded: documentUploaded,
        txnId: taxId,
        feeIds: feesId
      };
      console.log("postData pay--" + JSON.stringify(postData));
      //return $http.post('http://192.168.100.60:8085/MainetService/rest/mobilePaymentController/savePaymentRequest', postData).then(function(data) {
      return $http.post(api.serviceURL + 'mobilePaymentController/savePaymentRequest', postData).then(function (data) {
        console.log("savePaymentData" + JSON.stringify(data.data))
        return data.data;
      });
    };


    /*BRMS CALL START*/
    api.getinitializedmodel = function () {
      var postdata = { modelName: 'ChecklistModel|WaterRateMaster', 'dataModel': null }
      console.log("api.brms-->" + api.brmsurl);
      //	return $http.post(api.brmsurl + 'brms/getInitializedModel', postdata).then(function(data){
      return $http.post(api.brmsurl + 'services/rest/common/brmscommonservice/initializeModel', postdata).then(function (data) {
        return data.data;
      });
    };
    api.validateOtp = function (otp) {
      var postdata = { otp: otp }
      console.log("api.brms-->" + api.brmsurl);
      //	return $http.post(api.brmsurl + 'brms/getInitializedModel', postdata).then(function(data){
      return $http.post('http://52.66.24.49:8090/MainetService/services/property/rest/selfAssessment/validateOTP', postdata).then(function (data) {
        return data.data;
      });
    }
    api.getinitializedmodelSocial = function () {
      var postdata = { modelName: 'ChecklistModel' }
      console.log("api.brms-->" + api.brmsurl);
      //	return $http.post(api.brmsurl + 'brms/getInitializedModel', postdata).then(function(data){
      return $http.post(api.brmsurl + 'services/rest/common/brmscommonservice/initializeModel', postdata).then(function (data) {
        return data.data;
      });
    };

    api.checklistcall = function (serviceCode, deptCode, tariftext, permisetext, apptypetext, WNCexistconsumerdetail,
      WNCexistproperty, WNCBpl, usageSubtype1, usageSubtype2, usageSubtype3,
      usageSubtype4, usageSubtype5, noOfDays, isOutStandingPending,
      disConnectionType, factor1, factor2, factor3, factor4, orgid, ruleId, taxCode, taxType,
      connectionSize, trasnferMode) {

      var postdata = {
        modelName: null,
        dataModel: [{
          orgId: orgid,
          usageSubtype1: tariftext,
          usageSubtype2: usageSubtype2,
          usageSubtype3: usageSubtype3,
          usageSubtype4: usageSubtype4,
          usageSubtype5: usageSubtype5,
          factor1: factor1,
          factor2: factor2,
          factor3: $sessionStorage.wrfactor3,
          factor4: $sessionStorage.wrfactor4,
          isBPL: WNCBpl,
          noOfDays: noOfDays,
          serviceCode: serviceCode,
          deptCode: deptCode,
          financialYear: "NA",
          ruleId: ruleId,
          applicantType: "NA",
          isOutStandingPending: isOutStandingPending,
          isExistingConnectionOrConsumerNo: WNCexistconsumerdetail,
          isExistingProperty: WNCexistproperty,
          disConnectionType: disConnectionType,
          documentGroup: null
        }]
      }
      console.log("checklistdata--" + JSON.stringify(postdata));
      return $http.post(api.bpmsurl + 'water/getServiceCharge', postdata).then(function (data) {
        //return $http.post('http://192.168.100.157:8090/MainetService/services/rest/common/brmscommonservice/checkList', postdata).then(function(data){
        console.log("check list data", +JSON.stringify(data.data))
        return data.data;
      });
    };

    api.checklistcall2 = function (serviceCode, deptCode, tariftext, permisetext, apptypetext, WNCexistconsumerdetail, WNCexistproperty, WNCBpl, usageSubtype3,
      usageSubtype4, usageSubtype5, noOfDays, isOutStandingPending, disConnectionType, factor1, factor2, factor3, factor4, orgid,
      appType, ruleId, docGroup, fiancialYear) {
      var postdata = {
        dataModel: {
          documentGroup: docGroup,
          financialYear: fiancialYear,
          ruleId: ruleId,
          orgId: orgid,
          serviceCode: serviceCode,
          deptCode: deptCode,
          usageSubtype1: tariftext,
          usageSubtype2: usageSubtype3,
          usageSubtype3: usageSubtype3,
          usageSubtype4: usageSubtype4,
          usageSubtype5: usageSubtype5,
          applicantType: apptypetext,                         //WNCapplicantype,
          noOfDays: noOfDays,
          isOutStandingPending: isOutStandingPending,
          isExistingConnectionOrConsumerNo: WNCexistconsumerdetail,
          isExistingProperty: WNCexistproperty,
          isBPL: WNCBpl,
          disConnectionType: disConnectionType,
          factor1: factor1,
          factor2: factor2,
          factor3: factor3,
          factor4: factor4,
          applicantType: "NA"
        }, modelName: null
      };
      console.log("checklistdata--" + JSON.stringify(postdata));
      return $http.post(api.brmsurl + 'services/rest/common/brmscommonservice/checkList', postdata).then(function (data) {
        return data.data;
      });
    };

    api.setdepentparams = function (orgid, serviceCode, chargeApplicableAt) {
      var postdata = {
        dataModel: {
          orgId: orgid,
          serviceCode: serviceCode,
          chargeApplicableAt: chargeApplicableAt
        }
      }
      console.log("setdepentparams--" + JSON.stringify(postdata));
      //return $http.post('http://192.168.100.210/MainetService/services/rest/water/brmswaterservice/dependentparams', postdata).then(function(data){
      return $http.post(api.brmsurl + 'services/rest/rti/brmsrtiservice/dependentparams', postdata).then(function (data) {
        return data.data;
      });
    };
    api.setdepentparamsforrti = function (orgid, serviceCode, chargeApplicableAt) {
      var postdata = {
        dataModel: {
          orgId: orgid,
          serviceCode: serviceCode,
          chargeApplicableAt: chargeApplicableAt
        }
      }
      console.log("setdepentparams--" + JSON.stringify(postdata));
      return $http.post(api.brmsurl + 'rest/brmsrtirestservice/dependentparams', postdata).then(function (data) {
        return data.data;
      });
    };
    api.servicecharge = function (serviceCode, deptCode, tariftext, permisetext, wrusageSubtype3, wrusageSubtype4, wrusageSubtype5, wrMeterType,
      wrConnType, WNCBpl, wrRoadType, wrtransferMode, wrDisConnType, wrfactor1, wrfactor2, wrfactor3, wrfactor4, TaxType,
      TaxCode, TaxCategory, TaxSubcategory, chargeApplicableAt, WNCConnSize, wrNewRatestartDate, orgid, subCategory, usageSubType2) {
      var postdata = {
        dataModel: [{
          orgId: orgid,
          serviceCode: serviceCode,
          deptCode: deptCode,
          taxType: TaxType,
          taxCode: TaxCode,
          taxCategory: TaxCategory,
          taxSubCategory: TaxSubcategory,
          usageSubtype1: tariftext,
          usageSubtype2: usageSubType2,
          usageSubtype3: wrusageSubtype3,
          usageSubtype4: wrusageSubtype4,
          usageSubtype5: wrusageSubtype5,
          meterType: wrMeterType,
          rateStartDate: wrNewRatestartDate,
          chargeApplicableAt: chargeApplicableAt,
          connectionSize: WNCConnSize,
          connectionType: wrConnType,
          isBPL: WNCBpl,
          taxSubCategory: subCategory,
          roadType: wrRoadType,
          transferMode: wrtransferMode,
          disConnectionType: wrDisConnType,
          factor1: wrfactor1,
          factor2: wrfactor2,
          factor3: wrfactor3,
          factor4: wrfactor4
        }]
      }
      console.log("servicecharge----" + JSON.stringify(postdata));
      //return $http.post('http://192.168.100.198:8090/mainetbpmservice/rest/water/getServiceCharge', postdata).then(function(data){
      return $http.post(api.brmsurl + 'services/rest/water/brmswaterservice/servicecharge', postdata).then(function (data) {
        return data.data;
      });
    };
    api.servicechargeCOU = function (dtoSeriveCharge) {
      console.log("servicecharge----" + JSON.stringify(dtoSeriveCharge));
      //return $http.post('http://192.168.100.198:8090/mainetbpmservice/rest/water/getServiceCharge', postdata).then(function(data){
      return $http.post(api.brmsurl + 'services/rest/water/brmswaterservice/servicecharge', dtoSeriveCharge).then(function (data) {
        return data.data;
      });
    };

    api.servicechargeWTDiscconection = function (serviceDto) {
      console.log("servicecharge----" + JSON.stringify(serviceDto));
      //return $http.post('http://192.168.100.198:8090/mainetbpmservice/rest/water/getServiceCharge', postdata).then(function(data){
      return $http.post(api.brmsurl + 'services/rest/water/brmswaterservice/servicecharge', serviceDto).then(function (data) {
        return data.data;
      });
    };

    api.servicechargeNW = function (serviceCode, deptCode, tariftext, permisetext, wrusageSubtype3, wrusageSubtype4, wrusageSubtype5, wrMeterType,
      wrConnType, WNCBpl, wrRoadType, wrtransferMode, wrDisConnType, wrfactor1, wrfactor2, wrfactor3, wrfactor4, TaxType,
      TaxCode, TaxCategory, TaxSubcategory, chargeApplicableAt, WNCConnSize, wrNewRatestartDate, orgid, subCategory,
      usageSubType2) {
      var postdata = {
        dataModel: [{
          orgId: orgid,
          serviceCode: serviceCode,
          deptCode: deptCode,
          taxType: TaxType,
          taxCode: TaxCode,
          taxCategory: TaxCategory,
          taxSubCategory: TaxSubcategory,
          usageSubtype1: tariftext,
          usageSubtype2: usageSubType2,
          usageSubtype3: wrusageSubtype3,
          usageSubtype4: wrusageSubtype4,
          usageSubtype5: wrusageSubtype5,
          meterType: wrMeterType,
          rateStartDate: wrNewRatestartDate,
          chargeApplicableAt: chargeApplicableAt,
          connectionSize: WNCConnSize,
          connectionType: wrConnType,
          isBPL: WNCBpl,
          taxSubCategory: subCategory,
          roadType: wrRoadType,
          transferMode: wrtransferMode,
          disConnectionType: wrDisConnType,
          factor1: wrfactor1,
          factor2: wrfactor2,
          factor3: wrfactor3,
          factor4: wrfactor4,
          taxPayer: $sessionStorage.isTaxPayer
        }]
      }
      console.log("servicecharge----" + JSON.stringify(postdata));
      //return $http.post('http://192.168.100.198:8090/mainetbpmservice/rest/water/getServiceCharge', postdata).then(function(data){
      return $http.post(api.brmsurl + 'services/rest/water/brmswaterservice/servicecharge', postdata).then(function (data) {
        return data.data;
      });
    };
    /*BRMS CALL END*/

    /*New Water Connection Start*/

    api.savewaterconndata = function (dto) {
      //        var newAppInDateApp = new Date().getTime();
      //        //console.log("dateeee"+newAppInDateApp)
      //
      //    		var postdata = {
      //              fName: WNCName,
      //              mName: null,
      //              lName: null,
      //              mobileNo: WNCmobile,
      //              phone: null,
      //              email: WNCemailid,
      //              orgId: orgid,
      //              deptId: null,
      //              empId: null,
      //              applicationId: null,
      //              challanNo: null,
      //              txnId: null,
      //              licenseNo: null,
      //              serviceId: serviceId,
      //              userId: userID,
      //              langId: parseInt($localStorage.langID),
      //              payStatus: null,
      //              payAmount: null,
      //              macId: null,
      //              updatedBy: userID,
      //              serviceShortCode: null,
      //              tenant: null,
      //              documentList: documentObjectArray,
      //              dirPath: null,
      //              titleId: null,
      //              blockNo: WNCaddress,
      //              floor: null,
      //              wing: null,
      //              bldgName: null,
      //              houseComplexName: null,
      //              roadName: WNCaddress,
      //              areaName: WNCaddress,
      //              pincodeNo: parseInt(WNCpincode),
      //              applicationType: null,
      //              phone1: null,
      //              phone2: null,
      //              wardNo: null,
      //              bplNo: WNCbplno,
      //              gender: null,
      //              aadhaarNo: null,
      //              zoneNo: null,
      //              blockName: null,
      //              flatBuildingNo: null,
      //              cityName: null,
      //              uid: null,
      //              free: false,
      //              idfId: null,
      //              status: null,
      //              departmentName: null,
      //              referenceId: null,
      //              isBPL: null,
      //              yearOfIssue: null,
      //              bplIssuingAuthority: null,
      //              apmOrgnName: null,
      //              apmMode: null,
      //              ccnNumber: null,
      //              binder: null,
      //              folio: null,
      //              meterSize: null,
      //              ccnSize: null,
      //              ownership: null,
      //              applicationDate: null,
      //              locId: null,
      //              isConsumer: isConsumer,
      //              isBillingAddressSame: isBilling,
      //              pinCode: parseInt(WNCpincode),
      //              billingPinCode: null,
      //              billingAdharNo: null,
      //              existingConsumerNumber: null,
      //              consumerNo: null,
      //              existingPropertyNo: null,
      //              propertyNo: WNCPropertyNo,
      //              consumerType: null,
      //              plumberName: null,
      //              lgIpMac: $localStorage.macAddress,
      //              isULBRegisterd: null,
      //              applicantType: null,
      //              charges: null,
      //              payMode: null,
      //              propertyOutStanding: null,
      //              applicantDTO: {
      //                organizationName: null,
      //                applicantFirstName: WNCName,
      //                applicantMiddleName: null,
      //                applicantLastName: null,
      //                gender: null,
      //                mobileNo: WNCmobile,
      //                emailId: "",
      //                pinCode: WNCpincode,
      //                buildingName: null,
      //                roadName: WNCaddress,
      //                applicantTitle: null,
      //                areaName: WNCaddress,
      //                blockName: null,
      //                housingComplexName: null,
      //                wing: null,
      //                floorNo: null,
      //                phone1: null,
      //                phone2: null,
      //                contactPersonName: null,
      //                villageTownSub: null,
      //                cfcCitizenId: null,
      //                povertyLine: null,
      //                orgId: 0,
      //                langId: parseInt($localStorage.langID),
      //                userId: 0,
      //                bplNo: WNCbplno,
      //                flatBuildingNo: null,
      //                codTryId1: null,
      //                codTryId2: null,
      //                codTryId3: null,
      //                codTryId4: null,
      //                codTryId5: null,
      //                aadharNo: "",
      //                dwzid1: null,
      //                dwzid2: null,
      //                dwzid3: null,
      //                dwzid4: null,
      //                dwzid5: null,
      //                serviceId: null,
      //                departmentId: null,
      //                isBPL: WNCBpl,
      //                panNo: ""
      //              },
      //              ownerList: [],
      //              linkDetails: ExitstingConnections,
      //              csmrInfo: {
      //                csIdn: 0,
      //                csCcn: null,
      //                csApldate: newAppInDate,
      //                csOldccn: null,
      //                propertyNo: null,
      //                csTitle: null,
      //                csName: WNCName,
      //                csMname: null,
      //                csLname: null,
      //                csCcityName: null,
      //                csAdd: WNCaddress,
      //                csGender: 0,
      //                csFlatno: null,
      //                csBldplt: null,
      //                csLanear: WNCaddress,
      //                csRdcross: WNCaddress,
      //                csContactno: WNCmobile,
      //                csPinCode: null,
      //                csLocationId: null,
      //                csOtitle: null,
      //                csOname:WNCName,
      //                csOmname: null,
      //                csOlname: null,
      //                csOcityName: null,
      //                csOadd: WNCaddress,
      //                csOGender: null,
      //                csOflatno: null,
      //                csObldplt: null,
      //                csOlanear: null,
      //                csOrdcross: null,
      //                csOcontactno: WNCmobile,
      //                csCpinCode: parseInt(WNCpincode),
      //                csCcntype: null,
      //                csNoofusers: null,
      //                csCcnsize: WNCConnSize,
      //                csRemark: null,
      //                trdPremise: null,
      //                csNooftaps: null,
      //                csMeteredccn: null,
      //                pcFlg: null,
      //                pcDate: null,
      //                plumId: WNCPlumber,
      //                csCcnstatus: null,
      //                csFromdt: null,
      //                csTodt: null,
      //                orgId: orgid,
      //                userId: userID,
      //                langId: parseInt($localStorage.langID),
      //                lmodDate: null,
      //                updatedBy: null,
      //                updatedDate: newAppInDate,
      //                csPremisedesc: null,
      //                csBbldplt: null,
      //                csBlanear: null,
      //                csBrdcross: WNCaddress,
      //                csBadd: WNCaddress,
      //                csBpinCode: null,
      //                regno: null,
      //                meterreader: null,
      //                ported: null,
      //                electoralWard: null,
      //                csListatus: null,
      //                codDwzid1: WNCZone,
      //                codDwzid2: WNCWard,
      //                codDwzid3: null,
      //                codDwzid4: null,
      //                codDwzid5: null,
      //                csPowner: null,
      //                cpaCscid1: null,
      //                cpaCscid2: null,
      //                cpaCscid3: null,
      //                cpaCscid4: null,
      //                cpaCscid5: null,
      //                cpaOcscid1: null,
      //                cpaOcscid2: null,
      //                cpaOcscid3: null,
      //                cpaOcscid4: null,
      //                cpaOcscid5: null,
      //                cpaBcscid1: null,
      //                cpaBcscid2: null,
      //                cpaBcscid3: null,
      //                cpaBcscid4: null,
      //                cpaBcscid5: null,
      //                trmGroup1: WNCtarif,
      //                trmGroup2: null,
      //                trmGroup3: null,
      //                trmGroup4: null,
      //                trmGroup5: null,
      //                trmGroup6: null,
      //                csCcncategory1: null,
      //                csCcncategory2: null,
      //                csCcncategory3: null,
      //                csCcncategory4: null,
      //                csCcncategory5: null,
      //                lgIpMac: $localStorage.macAddress,
      //                lgIpMacUpd: null,
      //                wtV1: null,
      //                wtV2: null,
      //                wtV3: null,
      //                wtV4: null,
      //                wtV5: null,
      //                csCfcWard: null,
      //                annualRent: null,
      //                wtN3: null,
      //                wtN4: null,
      //                wtN5: null,
      //                wtD1: null,
      //                wtD2: null,
      //                wtD3: null,
      //                wtLo2: null,
      //                wtLo3: null,
      //                csTaxPayerFlag: WNCIsTaxPayer,
      //                csOldpropno: null,
      //                csSeqno: null,
      //                csEntryFlag: null,
      //                csOpenSecdepositAmt: null,
      //                csBulkEntryFlag: null,
      //                gisRef: null,
      //                csUid: null,
      //                csPanNo: null,
      //                applicationNo: null,
      //                typeOfApplication: WNCtemporary,
      //                fromDate: null,
      //                toDate: null,
      //                bplFlag: WNCBpl,
      //                bplNo: "",
      //                noOfFamilies: null,
      //                applicantType: null,
      //                csBcityName: null,
      //                csSewerageId: null,
      //                csReason: null,
      //                csServiceCharge: null,
      //                waterRequirement: null,
      //                dischargeCapacity: null,
      //                loccationId: null,
      //                csEmail: "",
      //                csOEmail: "",
      //                depositDate: null,
      //                ownerList: [{
      //                  ownerTitle: "",
      //                  ownerFirstName: "",
      //                  ownerMiddleName: "",
      //                  ownerLastName: "",
      //                  cao_id: null,
      //                  csIdn: null,
      //                  cao_address: null,
      //                  cao_contactno: null,
      //                  orgid: orgid,
      //                  userId: userID,
      //                  langId: parseInt($localStorage.langID),
      //                  lmoddate: newAppInDate,
      //                  updatedBy: null,
      //                  updatedDate: null,
      //                  lgIpMac: macAddress,
      //                  lgIpMacUpd: null,
      //                  gender: null,
      //                  caoUID: null,
      //                  caoNewTitle: null,
      //                  caoNewFName: null,
      //                  caoNewMName: null,
      //                  caoNewLName: null,
      //                  caoNewGender: null,
      //                  caoNewUID: null,
      //                  isDeleted: "N"
      //                }],
      //                roadList: null,
      //                linkDetails: null,
      //                distribution: null,
      //                bpincode: WNCpincode,
      //                opincode: WNCpincode,
      //                csIsBillingActive: null,
      //                depositAmount: null,
      //                receiptNumber: null,
      //                numberOfDays: null,
      //                maxNumberOfDay: null,
      //                distributionMainLineNumber: null,
      //                distributionMainLineName: null,
      //                distributionChildLineNumber: null,
      //                distributionChildLineName: null,
      //                ccnOutStandingAmt: null,
      //                totalOutsatandingAmt: WCPropertyOutstanding,
      //                csPtype: "U",
      //                propertyUsageType: WMNCUsageType
      //              },
      //              csmrrCmd: {
      //                csId: null,
      //                csIdn: null,
      //                rcDistpres: null,
      //                rcDisttimefr: null,
      //                rcDisttimeto: null,
      //                rcDistccndif: null,
      //                rcDailydischg: null,
      //                rcGranted: null,
      //                rcStatus: null,
      //                rcLength: null,
      //                rcRecommended: null,
      //                rcDailydischgc: null,
      //                orgId: null,
      //                userId: null,
      //                langId: parseInt($localStorage.langID),
      //                lmodDate: null,
      //                updatedBy: null,
      //                updatedDate: null,
      //                rcRhgl: null,
      //                rcAhgl: null,
      //                rcDispWt: null,
      //                lgIpMac: null,
      //                lgIpMacUpd: null,
      //                wtV1: null,
      //                wtV2: null,
      //                wtV3: null,
      //                wtV4: null,
      //                wtV5: null,
      //                wtN1: null,
      //                wtN2: null,
      //                wtN3: null,
      //                wtN4: null,
      //                wtN5: null,
      //                wtD1: null,
      //                wtD2: null,
      //                wtD3: null,
      //                wtLo1: null,
      //                wtLo2: null,
      //                wtLo3: null,
      //                instId: null,
      //                codId1: null,
      //                codId2: null,
      //                codId3: null,
      //                codId4: null,
      //                codId5: null,
      //                rcTotdisttime: null
      //              },
      //              scrutinyApplicable: false,
      //              paymentModeOnline: false
      //             }
      console.log("NEW Water conn----" + JSON.stringify(dto));

      //    	 alert("NEW Water conn----"+JSON.stringify(postdata));
      var url = api.serviceURL + 'newWaterConnectionForm/saveNewWaterConnection';
      // var url = 'http://192.168.100.210/MainetService/MainetService/rest/newWaterConnectionForm/saveNewWaterConnection';
      return $http.post(url, dto).then(function (data) {

        return data.data;
      });
    };

    /*New Water Connection Ended*/

    /*Change of usage start*/

    api.changeusageservice = function (changeusages, orgid) {
      var postdata = { orgId: orgid, connectionNo: changeusages }
      console.log("change of usage--" + JSON.stringify(postdata));
      return $http.post(api.serviceURL + 'ChangeOfUsage/getConnectionData', postdata).then(function (data) {
        return data.data;
      });
    };

    api.COUsaveservice = function (saveDto) {

      console.log("change of usage--" + JSON.stringify(saveDto));
      return $http.post(api.serviceURL + 'ChangeOfUsage/saveChangeData', saveDto).then(function (data) {
        return data.data;
      });
    };
    /*Change of usage end*/

    /*Change of owner start*/

    api.changeofownerservice = function (changeowner, orgid) {
      var postdata = { orgnId: orgid, connectionNo: changeowner }
      return $http.post(api.serviceURL + 'ChangeOfOwnerWaterConnection/getOldConnectionData', postdata).then(function (data) {
        return data.data;
      });
    };

    api.changeofownersaveservice = function (WNCselecttitle, WNCFirstname, WNCMiddlename, WNCLastname, COURemarks,
      changeowner, WNCgender, oldCOWconnName, oldtitle, oldconnNo, oldcsidn, oldCOUconnSize, oldcodDwzid1, oldcodDwzid2,
      oldCOUtarifCate, oldCOUpermiseType, oldCOUmetertype, oldCOUapplicantType, newtransfermode,
      documentObjectArray, orgid, userID, applicantinfo, canApplyOrNot, macAddress, serviceid, deptId) {

      var postdata = {
        orgnId: orgid,
        csIdn: oldcsidn,
        apmApplicationId: null,
        cooApldate: null,
        cooNotitle: WNCselecttitle,
        cooNoname: WNCFirstname,
        cooNomname: WNCMiddlename,
        cooNolname: WNCLastname,
        cooOtitle: null,
        cooOname: null,
        cooOomname: null,
        cooOolname: null,
        cooRemark: COURemarks,
        cooGranted: null,
        userEmpId: userID,
        langId: $localStorage.langID,
        cooNotitleCopy: null,
        lgIpMac: macAddress,
        cooUidNo: null,
        conUidNo: null,
        serviceId: serviceid,
        amount: 0,
        documentSize: null,
        onlineOfflineCheck: null,
        responseDto: [],
        applicant: applicantinfo,
        fileList: ["", "", "", "", ""],
        uploadedDocList: documentObjectArray,
        departmenttId: deptId,
        connectionNo: changeowner,
        gender: WNCgender,
        additionalOwners: [{
          ownerTitle: null,
          ownerFirstName: null,
          ownerMiddleName: null,
          ownerLastName: null,
          cao_id: null,
          csIdn: null,
          cao_address: null,
          cao_contactno: null,
          orgid: null,
          userId: null,
          langId: null,
          lmoddate: null,
          updatedBy: null,
          updatedDate: null,
          lgIpMac: macAddress,
          lgIpMacUpd: null,
          gender: null,
          caoUID: null,
          caoNewTitle: "",
          caoNewFName: "",
          caoNewMName: "",
          caoNewLName: "",
          caoNewGender: "",
          caoNewUID: null,
          isDeleted: null
        }],
        oldOwnerInfo: {
          pinCode: null,
          email: null,
          phone: null,
          registrationNo: null,
          registrationYear: null,
          noOfCopies: null,
          applicationNo: null,
          amount: null,
          applicationDate: null,
          status: null,
          errorMsg: null,
          errorCode: null,
          cause: null,
          wsInputErrorList: null,
          checkList: null,
          ruleResults: null,
          cooOtitle: oldtitle,
          cooOname: null,
          cooOomname: null,
          cooOolname: null,
          cooUidNo: null,
          connectionNumber: oldconnNo,
          conId: oldcsidn,
          conType: null,
          conSize: null,
          conCategory: null,
          codDwzid1: oldcodDwzid1,
          codDwzid2: oldcodDwzid2,
          codDwzid3: null,
          codDwzid4: null,
          trmGroup1: oldCOUtarifCate,
          trmGroup2: oldCOUpermiseType,
          trmGroup3: null,
          trmGroup4: null,
          trmGroup5: null,
          oldOwnerFullName: oldCOWconnName,
          csOGender: null,
          canApplyOrNot: canApplyOrNot,
          meterType: oldCOUmetertype,
          applicantType: oldCOUapplicantType,
          taxCategory: null,
          taxSubCategory: null
        },
        ownerTransferMode: newtransfermode.tfmid
      }
      console.log("change of owner-->" + JSON.stringify(postdata));
      return $http.post(api.serviceURL + 'ChangeOfOwnerWaterConnection/saveChangeData', postdata).then(function (data) {
        return data.data;
      });
    };
    /*Change of owner End*/

    /*  water disconnection */

    api.disconnsearchConnectionDetails = function (dissconnectionDto) {
      console.log("disconnectionDto" + JSON.stringify(dissconnectionDto))
      //      	return $http.post('http://192.168.100.48:8180/MainetService/rest/WaterDisconnection/searchConnectionDetails',postdata)
      return $http.post(api.serviceURL + 'WaterDisconnection/searchConnectionDetails', dissconnectionDto)
        .then(function (data) {
          return data.data;
        });
    };

    api.validatePlumber = function (plumberNo) {
      //      	return $http.post('http://192.168.100.48:8180/MainetService/rest/WaterDisconnection/validatePlumberLinceOutsideULB',plumberNo)
      return $http.post(api.serviceURL + 'WaterDisconnection/validatePlumberLinceOutsideULB', plumberNo)
        .then(function (data) {
          return data.data;
        });
    }

    api.disconnsave = function (saveDisccDto) {
      console.log("dissConn--" + JSON.stringify(saveDisccDto));
      //      	return $http.post('http://192.168.100.48:8180/MainetService/rest/WaterDisconnection/saveDisconnectionDetails',postdata)
      return $http.post(api.serviceURL + 'WaterDisconnection/saveDisconnectionDetails', saveDisccDto)
        .then(function (data) {
          return data.data;
        });
    };
    /* reconnection service */
    api.reconnectionsearch = function (orgid, userID) {
      var postdata =
        { orgId: orgid, userId: userID }
      //      	return $http.post('http://192.168.100.48:8180/MainetService/rest/WaterReconnection/searchReconnectionDetails',postdata)
      return $http.post(api.serviceURL + 'WaterReconnection/searchReconnectionDetails', postdata)
        .then(function (data) {
          return data.data;
        });
    };

    /*Login service and registration start*/

    api.ulbService = function () {
      console.log("api.eipUrl-" + api.eipUrl);
      console.log("api.serviceURL-->" + api.serviceURL);
      //  return $http.post('http://52.66.24.49:8090/portalrest/organisationsListController/getOrganisationsList').then(function(data){
      return $http.post(api.eipUrl + 'organisationsListController/getOrganisationsList').then(function (data) {
        console.log("data", +data);
        return data.data;
      });
    };

    api.wardService = function (data) {
      return $http.post(api.serviceURL + 'commonService/getLocationWardZone/' + data).then(function (data) {
        return data.data;
      });
    };

      //FAQ
      api.getFaqData = function (orgId ) {
        var url = api.eipUrl+'citizenAPI/getFrequentlyAskedQuestions/' + orgId;
                  //console.log("uRL----" + url);
                  return $http.get(url).then(function (data) {
                    return data.data;
          });
      };

    api.loginservice = function (loginmobileNo, loginPassword, ULBid, langID) {
      var postdata = {
        userName: loginmobileNo,
        passWord: loginPassword,
        langId: langID,
        orgId: ULBid
      }
      console.log("postdata--" + JSON.stringify(postdata));
      //	return $http.post('http://192.168.100.118:8092/portalrest/registrationController/AuthenticationProcess',postdata).then(function(data){
      return $http.post(api.eipUrl + 'registrationController/AuthenticationProcess', postdata).then(function (data) {
        return data.data;
      });
    };

    api.registerservice = function (regfirstname, reglastname, reggender, regdob, regmobile, regemailid, orgid, langID, middleName, titleId) {
      var postdata = {
        orgId: orgid,
        langId: $localStorage.langID,
        firstName: regfirstname,
        middleName: middleName,
        title: titleId,
        lastName: reglastname,
        gender: reggender,
        dob: regdob,
        mobileNo: regmobile,
        emailId: regemailid
      }
      console.log("registerservice--" + JSON.stringify(postdata));
      return $http.post(api.eipUrl + 'registrationController/doRegistration', postdata).then(function (data) {
        // 	return $http.post('http://192.168.100.14:8082/portalrest/registrationController/doRegistration', postdata).then(function(data){
        return data.data;
      });
    };

    api.optservice = function (regmobile, regotp, RegorgId, regUserID) {
      var postdata = {
        langId: $localStorage.langID,
        userId: regUserID,
        orgId: RegorgId,
        mobileNo: regmobile,
        otpPass: regotp,
        isregistered: "N"
      }
      // return $http.post('http://192.168.100.14/portalrest/registrationController/doOTPVerification', postdata).then(function(data){
      return $http.post(api.eipUrl + 'registrationController/doOTPVerification', postdata).then(function (data) {
        return data.data;
      });
    };
    api.forgototpverfiy = function (orgid, userID, forgotmobileNo, forgototp) {
      var postdata = {
        langId: $localStorage.langID,
        userId: userID,
        orgId: orgid,
        mobileNo: forgotmobileNo,
        otpPass: forgototp,
        isregistered: "Y"
      }
      //	return $http.post('http://192.168.100.118:8092/portalrest/registrationController/doOTPVerification', postdata).then(function(data){
      return $http.post(api.eipUrl + 'registrationController/doOTPVerification', postdata).then(function (data) {
        return data.data;
      });
    };

    api.passwordservice = function (regmobile, regpassword, RegorgId, regUserID) {
      var postdata = {
        langId: $localStorage.langID,
        userId: regUserID,
        orgId: RegorgId,
        mobileNo: regmobile,
        otpPass: regpassword,
      }
      //return $http.post('http://192.168.100.14/portalrest/registrationController/setPassword', postdata).then(function(data){
      return $http.post(api.eipUrl + 'registrationController/setPassword', postdata).then(function (data) {
        return data.data;
      });
    };

    /*forgot password*/
    api.forgotoptservice = function (orgid, forgotmobileNo) {

      var postdata = {
        langId: $localStorage.langID,
        orgId: orgid,
        mobileNo: forgotmobileNo,
      }
      // return $http.post('http://192.168.100.118:8092/portalrest/registrationController/resendOTPForMobile', postdata).then(function(data){
      return $http.post(api.eipUrl + 'registrationController/ResendOTP', postdata).then(function (data) {
        return data.data;
      });
    };
    api.forgotoptserviceformobile = function (orgid, forgotmobileNo) {
      // alert("here")
      var postdata = {
        langId: $localStorage.langID,
        orgId: orgid,
        mobileNo: forgotmobileNo,
      }

      return $http.post(api.eipUrl + 'registrationController/resendOTPForMobile', postdata).then(function (data) {
        //return $http.post('http://192.168.100.118:8092/portalrest/registrationController/resendOTPForMobile', postdata).then(function(data){
        return data.data;
      });
    };



    api.forgotpasswordservice = function (orgid, userID, forgotmobileNo, forgotpassword) {
      var postdata = {
        langId: $localStorage.langID,
        userId: userID,
        orgId: orgid,
        mobileNo: forgotmobileNo,
        otpPass: forgotpassword,
        /*loginType:"C",*/
      }

      //return $http.post('http://192.168.100.14/portalrest/registrationController/setPassword', postdata).then(function(data){
      return $http.post(api.eipUrl + 'registrationController/setPassword', postdata).then(function (data) {
        return data.data;
      });
    };
    /*Login Service and registration End*/

    /* complaiint service start */

    api.organisationList = function (districtID) {
      var url = api.serviceURL + 'mobility/grievance/organisationsByDistrictId/' + districtID;
      console.log("url---" + url);
      return $http.post(url).then(function (response) {
        return response.data;
      });
    };
    api.contactuslist = function (orgid) {
      // var url = api.eipUrl + 'organisationsListController/getContactUsList/' + orgid;
      var url = api.eipUrl + 'organisationsListController/getContactUsList/1/' + orgid;
      console.log("url---" + url);
      return $http.post(url).then(function (response) {
        return response.data;
      });
    };
    api.getOrgByDistrictId = function (districtId) {
      var url = api.serviceURL + 'brmsrtirestservice/getRtiOrganisations/' + districtId;
      console.log("url---" + url);
      return $http.post(url).then(function (response) {
        return response.data;
      });
    };
    api.getOrgByDistrictIdforcomplaint = function (districtId) {
      var url = api.serviceURL + 'mobility/grievance//organisationsByDistrictId/' + districtId;
      console.log("url---" + url);
      return $http.post(url).then(function (response) {
        return response.data;
      });
    };
    api.saveContachData = function (postData) {
      var url = api.eipUrl + 'organisationsListController/saveContactUsDet';
      return $http.post(url, postData).then(function (response) {
        return response.data;
      });
    };
    api.deptprefix = function (orgid, type) {
      var url = api.serviceURL + 'mobility/grievance/departmentComplaintsByOrgId/' + orgid + "/" + type;
      //var url =  'http://192.168.100.13:8090/MainetService/rest/mobility/grievance/departmentComplaintsByOrgId/' + orgid + "/" +type;
      console.log("url---" + url);
      return $http.post(url).then(function (response) {
        return response.data;
      });
    };

    api.finddeptcompltype = function (NewCompDeptdetails, orgid) {
      console.log("values" + NewCompDeptdetails + " " + orgid)
      var url = api.serviceURL + "mobility/grievance/departmentComplaintTypeByDepartmentId/" + NewCompDeptdetails + "/" + orgid;
      return $http.post(url).then(function (response) {
        return response.data;
      });
    };
    api.finddeptcompltype = function (departmentID, orgid, type) {
      var url = api.serviceURL + "mobility/grievance/departmentComplaintTypeByDepartmentId/" + departmentID + "/" + orgid + "/" + type;
      // var url = "http://192.168.100.13:8090/MainetService/rest/mobility/grievance/departmentComplaintTypeByDepartmentId/"+ departmentID + "/" + orgid + "/" +type;
      console.log("url---" + url);
      return $http.post(url).then(function (response) {
        return response.data;
      });
    };
    api.deptdefinedlocation = function (orgid, NewCompDeptdetails) {
      //	var url = api.serviceURL + 'newGrievance/fetchLocationsByOrgId/' + orgid;
      var url = api.serviceURL + 'mobility/grievance/fetchLocationsByOrgIdAndDeptId/' + orgid + '/' + NewCompDeptdetails;
      console.log("url----" + url)
      return $http.post(url).then(function (response) {
        return response.data;
      });
    };

    api.pincodeprefix = function (NewCompPincode) {
      //	    var url = api.serviceURL + "newGrievance/getLocationByPinCode/" + NewCompPincode;
      var url = api.serviceURL + "mobility/grievance/getLocationByPinCode/" + NewCompPincode;
      return $http.post(url).then(function (response) {
        return response.data;
      });
    };

    api.escalation = function (NewCompDeptdetails, NewCompType, orgid) {
      var url = api.serviceURL + "mobility/grievance/fetchWorkflowTypeByDepOrgAndComplaint/" + orgid + "/" + NewCompDeptdetails + "/" + NewCompType;
      console.log("escalation--" + url);
      return $http.post(url).then(function (response) {
        return response.data;
      });
    };

    api.lodgecomplaintsave = function (District, NewCompPincode, NewCompDeptdetails, NewCompType,extReferNumber,landmark,
       NewCompDescription,
      NewCompLocation, orgid, userID, complaintType, applicantDTO, uploadfinaldata, Latitude, Longitude, 
      referenceMode, rreferenceCategory, rward1, rreferenceDate, rapplnType, ward2
      ) {

      var postdata = {
        applicantDetailDto: applicantDTO,
        careRequest: {
          id: null,
          requestType: "Requester Action",                              //by sanket
          description: NewCompDescription,
          applicationId: null,
          orgId: orgid,
          district: District,
          createdDate: null,
          createdBy: userID,
          modifiedDate: null,
          modifiedBy: null,
          departmentComplaint: NewCompDeptdetails,
          complaintType: NewCompType,
          departmentComplaintDesc: null,
          complaintTypeDesc: complaintType,
          location: NewCompLocation,
          locationEngName: null,
          locationRegName: null,
          pincode: NewCompPincode,
          status: null,
          latitude: Latitude,
          longitude: Longitude,
          referenceMode: referenceMode,
          referenceCategory: rreferenceCategory,
          ward1: rward1,
          ward2: ward2,
          // ward3: ward3,
          // ward4: ward4,
          // ward5: ward5,
          referenceDate: rreferenceDate,
          applnType: rapplnType,
          smServiceId: NewCompType,
          extReferNumber: extReferNumber,
          landmark: landmark
        },
        careFeedback: null,
        action: {
          id: null,
          applicationId: null,
          decision: null,
          comments: NewCompDescription,
          orgId: orgid,
          empId: applicantDTO.mobileNo,
          empType: null,
          taskId: null,
          taskName: null,
          dateOfAction: null,
          createdDate: null,
          createdBy: userID,
          modifiedDate: null,
          modifiedBy: null,
          empName: null,
          empEmail: null,
          empGroupDescEng: null,
          empGroupDescReg: null,
          attachementId: null
        },
        reopen: false,
        attachments: uploadfinaldata
      }
      
      console.log("postdata-careRequest--" + JSON.stringify(postdata));
      return $http.post(api.serviceURL + 'mobility/grievance/save', postdata)
        //return $http.post('http://192.168.100.13:8090/MainetService/rest/mobility/grievance/save',postdata)
        .then(function (data) {

          return data.data;
        });
    };

    /* reopen complaint*/
    api.getComplaintTypeConfig = function (lookup, id) {
      var url = api.serviceURL + '/mobility/grievance/getPrefixLevelDataForApplicantType/' + lookup + '/' + id;
      console.log("uRL----" + url);
      return $http.post(url).then(function (data) {
        return data.data;
      });
    };
    api.allgrieavance = function (userID, mobileNo) {
      var url = api.serviceURL + 'mobility/grievance/careRequests/empId/emplType/' + mobileNo + '/29';
      console.log("uRL----" + url);
      return $http.post(url).then(function (data) {
        return data.data;
      });
    };

    api.actionHistorybyDocID = function (SelectedTask, langID) {
      var url = api.serviceURL + 'workflow/workflowActions/log/referenceId/' + SelectedTask + '/lang/' + langID;
      console.log("uRL----" + url);
      return $http.post(url).then(function (data) {
        return data.data;
      });
    };

    api.getCareRequestByRequestNo = function (requestNo) {
      console.log("--requestNo--" + requestNo);
      return $http.post(api.serviceURL + 'mobility/grievance/careRequests/applicationId/' + requestNo)
        .then(function (data) {
          return data.data;
        });
    };

    api.reopenedSaveGrievances = function (RequestNoresponse, reply, orgid, userID, tokenNumber, uploadeddoc, reOpeningRemark, mob) {
      var postdata =
      {
        applicantDetailDto: null,
        careRequest: RequestNoresponse,
        careFeedback: null,
        action: {
          applicationId: tokenNumber,
          comments: reply,
          orgId: orgid,
          empId: mob,
          empType: null,
          createdBy: userID,
          reopeningReason: reOpeningRemark
        },
        reopen: true,
        attachments: uploadeddoc
      }
      console.log("postdataReopen--" + JSON.stringify(postdata));
      return $http.post(api.serviceURL + 'mobility/grievance/reopen', postdata)
        .then(function (data) {
          return data.data;
        });
    };

    /* complaiint service end  mobility */

    /*complaiint service status start*/

    api.commonSearchStatus = function (tokennumber) {
      return $http.post(api.serviceURL + 'mobility/grievance/careRequests/search/' + tokennumber)
        .then(function (data) {
          return data.data;
        });
    };

    api.getGrievanceStatus = function (tokennumber, langID) {
      console.log("tokennumber-" + tokennumber + "langID-" + langID);
      //return $http.post(api.serviceURL + 'mobility/grievance/careRequests/acknowledgement/complaintId/' + tokennumber + '/' + langID)
      return $http.post(api.serviceURL + 'mobility/grievance/careRequests/acknowledgement/applicationId/' + tokennumber + '/' + langID)
        .then(function (data) {
          return data.data;
        });
    };

    api.getGrievanceApplicantStatus = function (tokennumber, langID) {
      console.log("tokennumber-" + tokennumber + "langID-" + langID);
    return $http.post(api.serviceURL + 'mobility/grievance/careRequests/acknowledgement/complaintId/' + tokennumber + '/' + langID)
    //return $http.post(api.serviceURL + 'mobility/grievance/careRequests/acknowledgement/applicationId/' + tokennumber + '/' + langID)
        .then(function (data) {
          return data.data;
        });
    };


    api.getGrievanceStatusMobile = function (mobilenumber) {
      return $http.post(api.serviceURL + 'mobility/grievance/careRequests/mobileNumber/' + mobilenumber)
        .then(function (data) {
          return data.data;
        });
    };

    api.getcomplaintlogdetails = function (tokennumber) {
      return $http.post(api.serviceURL + 'workflow/workflowActions/log/' + tokennumber)
        .then(function (data) {
          return data.data;
        });
    };

    /*complaiint service status end*/

    /*Rent and Lease Start*/
    api.getFilterList = function (postData) {
      console.log("getRNLPropFilterList : " + JSON.stringify(postData));
      //return $http.post('http://192.168.100.157:8090/MainetService/services/rest/rnl/brmsrnlservice/getFilteredRentedProperties',postData)
      return $http.post(api.brmsurl + 'services/rest/rnl/brmsrnlservice/getFilteredRentedProperties', postData)
        .then(function (data) {
          return data.data;
        });
    };
    api.getPropertyAmenityAndFacility = function (postData) {
      //return $http.post('http://192.168.100.157:8090/MainetService/rest/estateBooking/getPropertyAmenityFacility',postData)
      return $http.post(api.serviceURL + 'rest/estateBooking/getPropertyAmenityFacility', postData)

        .then(function (data) {
          return data.data;
        });
    };
    api.getEvenList = function (lookUpId, orgId) {
      var postData = {
        categoryId: lookUpId,
        orgId: orgId
      }
      console.log("getRNLEvent post: " + JSON.stringify(postData));
      return $http.post(api.serviceURL + 'estateBooking/getCategoryEvent', postData)
        .then(function (data) {
          return data.data;
        });
    };
    api.getRNLPropFilterList = function (lookUpId, orgId) {
      var postData = {
        type: lookUpId,
        orgId: orgId
      }
      console.log("getRNLPropFilterList post: " + JSON.stringify(postData));
      return $http.post(api.serviceURL + 'estateBooking/property/filterList', postData)
        .then(function (data) {
          return data.data;
        });
    };
    api.getRNLCalendarData = function (propId, orgId) {
      var postData = {
        propId: propId,
        orgId: orgId
      }
      console.log("getRNLCalendarData post: " + JSON.stringify(postData));
      return $http.post(api.serviceURL + 'estateBooking/getCalendarData', postData)
        .then(function (data) {
          return data.data;
        });
    };
    api.getRNLShiftDetail = function (bookingId, orgId) {
      var postData = {
        propId: bookingId,
        orgId: orgId
      }
      console.log("getRNLCalendarData post: " + JSON.stringify(postData));
      return $http.post(api.serviceURL + 'estateBooking/propertyInfo', postData)
        .then(function (data) {
          return data.data;
        });
    };
    api.getRNLMapData = function (propId, orgId) {
      var postData = {
        propId: propId,
        orgId: orgId
      }
      console.log("getRNLMapData post: " + JSON.stringify(postData));
      return $http.post(api.serviceURL + 'estateBooking/getMapData', postData)
        .then(function (data) {
          return data.data;
        });
    };
    api.getRNLPropData = function (propId, orgId) {
      var postData = {
        propId: propId,
        orgId: orgId
      }
      console.log("getRNLPropData post: " + JSON.stringify(postData));
      return $http.post(api.serviceURL + 'estateBooking/getProperty', postData)
        .then(function (data) {
          return data.data;
        });
    };
    api.getRNLShifts = function (propId, fromDate, toDate, orgId) {
      var postData = {
        propId: propId,
        fromDate: fromDate,
        toDate: toDate,
        orgId: orgId,
        categoryTypeId: null,
        prefixName: null,
        cpdValue: null,
        type: null,
        eventId: null,
        capcityFrom: 0,
        capcityTo: 0,
        rentFrom: 0.0,
        rentTo: 0.0
      }
      console.log("getRNLShifts post: " + JSON.stringify(postData));
      return $http.post(api.serviceURL + 'estateBooking/getShiftsBasedOnDate', postData)
        .then(function (data) {
          return data.data;
        });
    };
    api.getRNLShiftsBased_on_date = function (propId, fromDate, toDate, orgId) {
      var postData = {
        propId: propId,
        fromDate: fromDate,
        toDate: toDate,
        orgId: orgId,
        categoryTypeId: null,
        prefixName: null,
        cpdValue: null,
        type: null,
        eventId: null,
        capcityFrom: 0,
        capcityTo: 0,
        rentFrom: 0.0,
        rentTo: 0.0
      }
      console.log("getRNLShifts post: " + JSON.stringify(postData));
      return $http.post(api.serviceURL + 'estateBooking/dateRangBetBookedDate', postData)
        .then(function (data) {
          return data.data;
        });
    };
    /*Rent and Lease End*/

    /*BRMS Call Start*/
    api.initializeModel = function (modelName) {
      var postData = { modelName: modelName }
      console.log("api.brmsurl-" + api.brmsurl)
      return $http.post(api.brmsurl + 'services/rest/common/brmscommonservice/initializeModel', postData).then(function (data) {
        return data.data;
      });
    };
    api.getChecklistCall = function (postData) {
      return $http.post(api.brmsurl + 'services/rest/common/brmscommonservice/checkList', postData)
        .then(function (data) {
          return data.data;
        });
    };
    api.dependentParams = function (orgId, serviceCode, chargeApplicableAt) {
      var postData = {
        dataModel: {
          orgId: orgId,
          serviceCode: serviceCode,
          chargeApplicableAt: chargeApplicableAt
        }
      }
      console.log("dependentParams postData: " + JSON.stringify(postData));
      return $http.post(api.brmsurl + 'services/rest/rnl/brmsrnlservice/dependentparams', postData).then(function (data) {
        return data.data;
      });
    }
    api.brmsServiceCharge = function (postData) {
      console.log("brmsServiceCharge postData: " + JSON.stringify(postData));
      return $http.post(api.brmsurl + 'services/rest/rnl/brmsrnlservice/servicecharge', postData)
        .then(function (data) {
          return data.data;
        });
    };
    api.saveRNLService = function (postData) {
      console.log("saveRNLService postData: " + JSON.stringify(postData));
      return $http.post(api.serviceURL + 'estateBooking/saveEstateBooking', postData)
        //return $http.post(api.serviceURL + 'estateBooking/saveEstateBooking', postData)
        .then(function (data) {
          return data.data;
        });
    };
    /*BRMS Call End*/
    /*Global*/
    api.getHPrefixData = function (lookUpCode, level, orgId) {
      var postData = {
        lookUpCode: lookUpCode,
        level: level,
        orgId: orgId
      }
      console.log("getHPrefixData post: " + JSON.stringify(postData));
      console.log("api.serviceURL-->" + api.serviceURL);
      return $http.post(api.serviceURL + 'commonService/retriveHData', postData)
        .then(function (data) {
          return data.data;
        });
    };
    api.getHPrefixLavel = function (lookUpCode, orgId) {
      console.log("api.serviceURL-->" + api.serviceURL);
      return $http.post(api.brmsurl + 'services/rest/care/care/getPrefixLevelData/' + lookUpCode + "/" + orgId)
        .then(function (data) {
          return data.data;
        });
    };
    api.getNHPrefixData = function (lookUpCode, orgId) {
      var postData = {
        lookUpCode: lookUpCode,
        orgId: orgId
      }
      console.log("getNHPrefixData post: " + JSON.stringify(postData));
      return $http.post(api.serviceURL + 'commonService/retriveNonHData', postData)

        .then(function (data) {

          return data.data;

        });

    };

    api.getTermsAndCondition = function (propId, orgId) {
      var postData = {
        propId: propId,
        orgId: orgId
      }
      console.log("getNHPrefixData post: " + JSON.stringify(postData));
      return $http.post(api.serviceURL + 'estateBooking/term', postData)
        .then(function (data) {
          return data.data;
        });
    };
    api.getServerDate = function () {
      return $http.post(api.serviceURL + 'commonService/getServerDate')
        //		return $http.post('http://192.168.100.198:8080/MainetService/rest/commonService/getServerDate')
        .then(function (data) {
          return data.data;
        });
    };

    /* Property Service */
    api.propertyBillPayment = function (propertysearch, assOldpropno, orgid, userID) {
      /*var postdata = {
                         orgId:orgid,
                         propNo:propertysearch,
                         oldPropNo:"",
                         userId:userID
                      }*/

      var postdata = { assNo: propertysearch, assOldpropno: assOldpropno, orgId: orgid, userId: userID }
      console.log("property post: " + JSON.stringify(postdata));
      //	  return $http.post(api.serviceURL + 'propertyBillPayment/getBillPayDetails' , postdata)
      return $http.post(api.cxfServiceUrl + 'services/property/rest/selfAssessment/getPropertyPaymentDetails', postdata)
        //   return $http.post('http://192.168.100.118:8091/MainetService/services/property/rest/selfAssessment/getPropertyPaymentDetails' , postdata)
        .then(function (data) {
          // console.log("yatin"+JSON.stringify(data.data))
          return data.data;
        });
    };


    api.savePayReqProperty = function (orgId, userId, langId, emailId, loginUserName, loginMobile, serviceShortName, applicationNo,
      flatRate, paymentType, propNo, udF2, chalasnServiceType, documentUploaded, taxId, feesId, serviceId) {
      var postData = {
        orgId: orgId,
        userId: userId,
        langId: parseInt(langId),
        email: emailId,
        applicantName: loginUserName,
        mobileNo: loginMobile,
        serviceShortName: serviceShortName,
        referenceId: propNo,
        dueAmt: flatRate,
        bankId: paymentType,
        udf1: applicationNo,
        udf2: udF2,
        challanServiceType: chalasnServiceType,
        documentUploaded: documentUploaded,
        txnId: taxId,
        feeIds: feesId
      };
      console.log("postData pay--" + JSON.stringify(postData));
      return $http.post(api.serviceURL + 'mobilePaymentController/savePaymentRequest', postData).then(function (data) {
        //return $http.post('http://192.168.100.60:8085/MainetService/rest/mobilePaymentController/savePaymentRequest', postData).then(function(data) {
        console.log("savePaymentData" + JSON.stringify(data.data))
        return data.data;
      });
    };

    api.getServiceId = function (orgId, departId) {
      return $http.post(api.cxfServiceUrl + 'services/rest/common/servicemaster/getServiceIdByShortName/' + orgId + "/" + departId)
        //return $http.post('http://192.168.100.60:8085/MainetService/services/property/rest/selfAssessment/getServiceIdByShortName/'+orgId+"/"+departId)
        .then(function (data) {
          return data.data;
        });
    };
    api.savePayReqprop = function (payingAmount, paymentGateway, propNo, applictNo, orgid, userID, loginUSername, LoginMobileNo,
      emailId, serviceCode, langID) {
      var postData = {
        orgId: orgid,
        userId: userID,
        langId: 1,
        email: emailId,
        applicantName: loginUSername,
        mobileNo: LoginMobileNo,
        serviceShortName: serviceCode,
        referenceId: propNo,
        dueAmt: payingAmount,
        bankId: paymentGateway,
        udf1: applictNo,
        udf2: "Y"                  //rahul
      };
      console.log("postData property pay--" + JSON.stringify(postData));
      console.log(api.serviceURL);
      return $http.post(api.serviceURL + 'mobilePaymentController/savePaymentRequest', postData).then(function (data) {
        //return $http.post('http://192.168.100.118:8091/MainetService/rest/mobilePaymentController/savePaymentRequest', postData).then(function(data) {
        return data.data;
      });
    };

    /* NO Change */
    api.validateProperty = function (propertynumber, assOldpropno, orgid) {
      //console.log("propertysearch--"+$scope.propertysearch);
      var ProvisionalAssesmentMstDto1 = {};
      if (propertynumber == undefined) {
        propertynumber = "";
      } if (assOldpropno == undefined) {
        assOldpropno = "";
      }
      ProvisionalAssesmentMstDto1.assNo = propertynumber;
      ProvisionalAssesmentMstDto1.assOldpropno = assOldpropno;
      var SelfAssessmentDeaultValueDTO1 = {};
      SelfAssessmentDeaultValueDTO1.orgId = orgid;
      var SelfAssessmentDeaultValueDTO = {};
      SelfAssessmentDeaultValueDTO.orgId = orgid;
      SelfAssessmentDeaultValueDTO.provisionalMas = ProvisionalAssesmentMstDto1


      //      var postdata = {
      //                       provisionalMas: {
      //                         proAssId: 0,
      //                         assNo: propertynumber,
      //                         tppApprovalNo: null,
      //                         assOldpropno: ""
      //                       },
      //                       leastFinYear: null,
      //                       orgId: orgid,
      //                       deptId: null
      //                     }

      console.log("validate post: " + JSON.stringify(SelfAssessmentDeaultValueDTO));
      return $http.post(api.cxfServiceUrl + 'services/property/rest/selfAssessment/checkValidProperty', SelfAssessmentDeaultValueDTO)
        // return $http.post('http://192.168.100.118:8091/MainetService/services/property/rest/selfAssessment/checkValidProperty ' ,SelfAssessmentDeaultValueDTO)
        .then(function (data) {
          return data.data;
        });
    };

    //  api.checklistandCharges = function(provAsseFactDtlDto){
    //
    //        console.log("post: "+JSON.stringify(provAsseFactDtlDto));
    //        //return $http.post(api.cxfServiceUrl + 'services/property/rest/selfAssessment/checklistAndChargesNoChnage' , postdata)
    //        return $http.post(api.cxfServiceUrl + 'services/property/rest/selfAssessment/fetchChecklistAndChargesForChangeAndNoChange' , provAsseFactDtlDto)
    //       // return $http.post('http://192.168.100.60:8085/MainetService/services/property/rest/selfAssessment/checklistAndChargesNoChnage' , postdata)
    //        .then(function(data) {
    //         return data.data;
    //        });
    //    }

    api.propertyBillPaymentSelf2 = function (propertysearch) {
      console.log("property post2: " + JSON.stringify(propertysearch));
      return $http.post(api.cxfServiceUrl + 'services/property/rest/selfAssessment/fetchChecklistAndChargesForChangeAndNoChange', propertysearch)
        // return $http.post('http://192.168.100.118:8091/MainetService/services/property/rest/selfAssessment/fetchChecklistAndChargesForChangeAndNoChange' , propertysearch)
        .then(function (data) {
          return data.data;
        });
    };

    api.saveSelfAssessment = function (noChangeSaveDate) {
      var postdata = noChangeSaveDate;
      console.log("post: " + JSON.stringify(postdata));
      return $http.post(api.cxfServiceUrl + 'services/property/rest/selfAssessment/saveSelfAssessment', postdata)
        //  return $http.post('http://192.168.100.118:8091/MainetService/services/property/rest/selfAssessment/saveSelfAssessment' , postdata)
        .then(function (data) {
          return data.data;
        });
    };

    /*Location */
    api.allLocationbyOrgID = function (orgID) {
      var url = api.cxfServiceUrl + 'services/rest/common/locationservice/orgId/' + orgID;
      return $http.post(url).then(function (data) {
        return data.data;
      });
    };

    api.getLocationWardZoneByID = function (locationID) {
      var url = api.cxfServiceUrl + 'services/rest/common/locationservice/locId/' + locationID;
      console.log("getLocationWardZoneByID--" + url);
      return $http.post(url).then(function (data) {
        return data.data;
      });
    };

    api.getLocationWardZoneData = function (location) {
      //console.log(lat,"rest service lat")
      //console.log(long,"rest service long")
      var token = "Bearer" + " " + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjoiZGVocmFkdW4iLCJQYXNzd29yZCI6ImFkbWluQDEyMyIsIlByb2plY3QiOiJzYzEwX2RlaHJhZHVuX3BnIiwiSG9zdCI6IjEwLjY3LjE3MS40NyIsIlBvcnQiOjU0MzIsInR5cGUiOiJQcm9mZXNzaW9uYWwiLCJpYXQiOjE2MTkyNjQxNzMsImF1ZCI6InNnbDpQcm9mZXNzaW9uYWwiLCJpc3MiOiJzZ2wudGxkIn0.qiQihyNiwE6H2XVEa11aWxN3AhFK9U6aCRPFUUYtb30cn9jc4yeTAt4I2jOp5sX3qlsYKNRtB2nkGGSUn7bBm6J33HFQC692LjRaDeTszI6BcNmGJTD9Ewr9nEDJY_0EUub0hC5uafVt0i4kZbCB6saW4P1vRzyGeO7WwKeEuBw"
      var url = 'https://dsclgis.uk.gov.in:8443/IGISRestAPI/Geocoder/GetLatLogFromLayer/landmark/address/Kanwali Road/*'
     
      //var url = 'https://dsclgis.uk.gov.in:8443/IGISRestAPI/Geocoder/GetLatLogFromLayer/landmark/address/' + location + '/*'
      console.log(url,"my url location....")
      
      return $http.get(url,{
        headers: { 'Authorization': token}
      }).then(function (data) {
        return data.data;
      });
      
    };
    api.locationnearBySearch = function (locationId, orgID) {
      var url = api.cxfServiceUrl + 'services/rest/common/locationservice/locCategory/' + locationId + '/orgId/' + orgID;
      console.log("urlll" + url);
      return $http.get(url).then(function (data) {
        return data.data;
      });
    };

    api.applicationStatus = function (applicationNumber) {
      var url = api.cxfServiceUrl + 'services/rest/common/applicationservice/status/applicationId/' + applicationNumber + '/lang/' + $localStorage.langID;
      return $http.post(url).then(function (data) {
        return data.data;
      });
    };

    api.getPlumber = function (orgId) {
      var url = api.cxfServiceUrl + 'services/rest/water/waterconnectionservice/getPlumberList/orgId/' + orgId;
      console.log("plumber url" + url);
      return $http.post(url).then(function (data) {
        return data.data;
      });
    };


    api.getPropertyDetails = function (no, orgid) {
      var authHeader = new Headers();
      authHeader.append('Content-Type', 'application/json');
      authHeader.append('Accept', 'application/json');
      console.log("hedaersss " + encodedString)
      console.log("no" + no)
      var postdata = {
        propertyNo: no,
        scheduleId: null,
        acquisitionDate: null,
        orgId: orgid,
        empId: null,
        deptId: null,
        finYearId: null,
        langId: 1,
        oldPropertyNo: null
      }
      console.log("post: " + JSON.stringify(postdata));
      return $http.post(api.cxfServiceUrl + 'services/property/rest/viewPropertyDetail/getPropertyDetails', postdata, { headers: authHeader })
        .then(function (data) {
          console.log("rest property" + JSON.stringify(data))
          return data.data;
        });
    };

    api.getServiceId = function (orgId, departId) {
      return $http.post(api.cxfServiceUrl + 'services/rest/common/servicemaster/getServiceIdByShortName/' + orgId + "/" + departId)
        //return $http.post('http://192.168.100.60:8085/MainetService/services/property/rest/selfAssessment/getServiceIdByShortName/'+orgId+"/"+departId)
        .then(function (data) {
          return data.data;
        });
    };

    //social security
    api.getBanks = function (orgId) {
      var postData = {
        orgId: orgId
      }
      console.log("getBanks post: " + JSON.stringify(postData));
      return $http.post(api.serviceURL + 'AccountReceiptEntry/getBankList', postData)
        .then(function (data) {
          return data.data;
        });
    };

    api.saveSSApplication = function (socialSecurityData) {

      console.log("SS post: " + JSON.stringify(socialSecurityData));
      return $http.post(api.cxfServiceUrl + 'services/rest/socialsecurity/schemeApplicationFormService/saveSocialSecurityApplication', socialSecurityData)
        .then(function (data) {
          return data.data;
        });
    };

    api.getServiceId = function (orgId, departId) {
      return $http.post(api.cxfServiceUrl + 'rest/common/servicemaster/getServiceIdByShortName/' + orgId + "/" + departId)
        //return $http.post('http://192.168.100.60:8085/MainetService/services/property/rest/selfAssessment/getServiceIdByShortName/'+orgId+"/"+departId)
        .then(function (data) {
          return data.data;
        });
    };

    //property mutation
    api.getMutablePropertyDetails = function (propId, oldPropId, orgId) {
      console.log("property no mutable" + propId)
      console.log("old property no mutable" + oldPropId)
      if (propId == null || propId == undefined) {
        propId = " "
      } else if (oldPropId == null || oldPropId == undefined) {
        oldPropId = " "
      }
      console.log("old property no mutable after change" + oldPropId)
      return $http.post(api.cxfServiceUrl + 'services/property/rest/mutation/fetchDetailForMutataion/' + propId + "/" + oldPropId + "/" + orgId)
        //return $http.post('http://192.168.100.211:8090/MainetService/services/property/rest/mutation/fetchDetailForMutataion/'+propId+"/"+oldPropId+"/"+orgId)
        .then(function (data) {
          return data.data;
        });
    };

    api.getMutablePropertyCheckList = function (checkListDto) {
      console.log("checkListDto" + JSON.stringify(checkListDto))
      return $http.post(api.cxfServiceUrl + 'services/property/rest/mutation/fetchCheckListForMutation', checkListDto)
        .then(function (data) {
          return data.data;
        });
    };

    api.getMutablePropertyCharges = function (chargesDto) {
      console.log("chargesDto" + JSON.stringify(chargesDto))
      return $http.post(api.cxfServiceUrl + 'services/property/rest/mutation/fetchChargesForMuatationForMobile', chargesDto)
        .then(function (data) {
          return data.data;
        });
    };

    api.saveMutationData = function (chargesDto) {
      console.log("savemutationDto" + JSON.stringify(chargesDto))
      return $http.post(api.cxfServiceUrl + 'services/property/rest/mutation/saveMutation', chargesDto)
        .then(function (data) {
          return data.data;
        });
    };

    api.getServiceId = function (orgId, departId) {
      console.log("orgId" + orgId + "departmentId" + departId)
      return $http.post(api.cxfServiceUrl + 'services/rest/common/servicemaster/getServiceIdByShortName/' + orgId + "/" + departId)
        //return $http.post('http://192.168.100.60:8085/MainetService/services/property/rest/selfAssessment/getServiceIdByShortName/'+orgId+"/"+departId)
        .then(function (data) {
          return data.data;
        });
    };
    api.callWorkFlowMutation = function (chargesDto) {
      console.log("chrage Work flow Dto" + JSON.stringify(chargesDto))
      return $http.post(api.cxfServiceUrl + 'services/property/rest/mutation/callWorkFlowForFreeService')
        //return $http.post('http://192.168.100.60:8085/MainetService/services/property/rest/selfAssessment/getServiceIdByShortName/'+orgId+"/"+departId)
        .then(function (data) {
          return data.data;
        });
    };
    api.getYeardata = function (deptId, OrgId) {
      var postData = {
        orgId: OrgId,
        deptId: deptId
      }
      console.log("year post: " + JSON.stringify(postData));
      return $http.post(api.cxfServiceUrl + 'services/property/rest/selfAssessment/defaultData', postData)
        .then(function (data) {
          console.log("response year: " + JSON.stringify(data));
          return data.data;
        });
    };
    api.getDepartmentId = function (orgId) {
      console.log("request department" + JSON.stringify(orgId))
      //return $http.post('http://192.168.100.211:8090/MainetService/services/property/rest/dataEntrySuite/getDeptIdByServiceShortName/'+orgId)
      return $http.post(api.cxfServiceUrl + 'services/property/rest/dataEntrySuite/getDeptIdByServiceShortName/' + orgId)
        .then(function (data) {
          console.log("response department" + JSON.stringify(data));
          return data.data;
        });
    };
    /*Global*/
    //no dues certificate

    api.getConnectionDetails = function (search) {
      console.log("---postData---" + JSON.stringify(search))
      return $http.post(api.serviceURL + 'waterNoDueCertificateController/getConnectionData', search).then(function (data) {
        //return $http.post('http://192.168.100.118:8091/MainetService/rest/waterNoDueCertificateController/getConnectionData',search).then(function(data){
        return data.data;
      });
    };
    api.saveConnectionDetails = function (search) {
      console.log("---postData---" + JSON.stringify(search))
      return $http.post(api.serviceURL + 'waterNoDueCertificateController/saveFormData', search).then(function (data) {
        //return $http.post('http://192.168.100.118:8091/MainetService/rest/waterNoDueCertificateController/getConnectionData',search).then(function(data){
        return data.data;
      });
    };
    api.servicechargeND = function (serviceDto) {
      console.log("servicecharge----" + JSON.stringify(serviceDto));
      //return $http.post('http://192.168.100.198:8090/mainetbpmservice/rest/water/getServiceCharge', postdata).then(function(data){
      return $http.post(api.brmsurl + 'services/rest/water/brmswaterservice/servicecharge', serviceDto).then(function (data) {
        return data.data;
      });
    };

    api.getSchemeName = function (orgId) {
      var postData = { orgId: orgId, deptId: 21, langId: 1 }
      console.log("getscheme post: " + JSON.stringify(postData));
      //return $http.post('http://192.168.100.157:8090/MainetService/services/rest/socialsecurity/schemeApplicationFormService/getSchemeName', postData)
      return $http.post(api.brmsurl + 'services/rest/socialsecurity/schemeApplicationFormService/getSchemeName', postData)
        .then(function (data) {
          return data.data;
        });
    };

    //plumber license
    api.savePlumberLicenseData = function (plumberDto) {
      console.log("plumber Data --" + JSON.stringify(plumberDto));
      return $http.post(api.serviceURL + 'PlumberLicense/savePlumberLicenseData', plumberDto).then(function (data) {
        return data.data;
      });
    };

    //plumber license department id
    api.getDepartId = function (orgId, ServiceCode) {
      console.log("plumber Data --" + JSON.stringify(ServiceCode));
      //return $http.post(api.serviceURL  + 'PlumberLicense/savePlumberLicenseData', plumberDto).then(function(data){
      return $http.post(api.brmsurl + 'services/rest/common/servicemaster/getDeptIdByServiceShortName/' + orgId + '/' + ServiceCode).then(function (data) {
        return data.data;
      });
    };
    //rti

    api.getRtiCheckList = function (orgId, usageSubtype1, usageSubtype2, usageSubtype3, usageSubtype4, usageSubtype5,
      factor1, factor2, factor3, factor4, isBPL, noOfDays, serviceCode, deptCode, financialYear, ruleId, applicantType,
      isOutStandingPending, isExistingConnectionOrConsumerNo, isExistingProperty, disConnectionType, documentGroup) {
      var dataModel = {}
      dataModel.orgId = isExistingConnectionOrConsumerNo;
      dataModel.usageSubtype1 = usageSubtype1;
      dataModel.usageSubtype2 = usageSubtype2;
      dataModel.usageSubtype3 = usageSubtype3;
      dataModel.usageSubtype4 = usageSubtype4;
      dataModel.usageSubtype5 = usageSubtype5;
      dataModel.factor1 = factor1;
      dataModel.factor2 = factor2;
      dataModel.factor3 = factor3;
      dataModel.factor4 = factor4;
      dataModel.isBPL = isBPL;
      dataModel.noOfDays = noOfDays;
      dataModel.serviceCode = orgId;
      dataModel.deptCode = deptCode;
      dataModel.financialYear = financialYear;
      dataModel.ruleId = ruleId;
      dataModel.applicantType = applicantType;
      dataModel.isOutStandingPending = isOutStandingPending;
      dataModel.isExistingConnectionOrConsumerNo = orgId;
      dataModel.isExistingProperty = isExistingProperty;
      dataModel.disConnectionType = disConnectionType;
      dataModel.documentGroup = documentGroup;

      var postData = {
        "modelName": null,
        "dataModel": dataModel
      }
      console.log("rtipostData " + JSON.stringify(postData))
      return $http.post(api.brmsurl + 'services/rest/common/brmscommonservice/checkList', postData).then(function (data) {
        return data.data;
      });
    };

    /*BRMS CALL START*/
    api.getinitializedmodelRti = function () {
      var postdata = { modelName: "ChecklistModel|RtiRateMaster" }
      console.log("api.brms-->" + api.brmsurl);
      //	return $http.post(api.brmsurl + 'brms/getInitializedModel', postdata).then(function(data){
      return $http.post(api.brmsurl + 'services/rest/common/brmscommonservice/initializeModel', postdata).then(function (data) {
        return data.data;
      });
    };
    api.getDepartmentByOrg = function (orgId) {
      var orgID = orgId.toString();
      console.log("request department" + JSON.stringify(orgID))
      return $http.post(api.cxfServiceUrl + 'services/rest/rti/brmsrtiservice/getDepartmentByOrg', orgID)
        .then(function (data) {
          console.log("response department" + JSON.stringify(data));
          return data.data;
        });
    };

    api.getDepartmentLocByOrg = function (orgId, deptId) {
      var orgID = orgId.toString();
      console.log("request department loc" + JSON.stringify(orgID))
      return $http.post(api.cxfServiceUrl + 'services/rest/rti/brmsrtiservice/getDeptLocation/orgId/' + orgId + '/deptId/' + deptId)
        .then(function (data) {
          console.log("response department loc" + JSON.stringify(data));
          return data.data;
        });
    };

    api.saveRtiData = function (rtiData) {
      console.log("---postData---" + JSON.stringify(rtiData))
      //return $http.post('http://192.168.100.145:8092/MainetService/services/rest/rti/brmsrtiservice/saveRTIApplication', rtiData).then(function(data) {
      return $http.post(api.cxfServiceUrl + 'services/rest/rti/brmsrtiservice/saveRTIApplication', rtiData).then(function (data) {
        // toaster.error($filter('translate')('ERROR'),  data.data);
        return data.data;
      });
    };

    api.prefixpayment = function (orgid) {
      var postData = {
        orgId: orgid,
      };
      return $http.post(api.serviceURL + 'commonService/getPrefixDataForPayAtCounter', postData).then(function (data) {
        return data.data;
      });
    };
    api.servicechargeRti = function (chargeData) {
      console.log("servicecharge----" + JSON.stringify(chargeData));
      //return $http.post('http://192.168.100.198:8090/mainetbpmservice/rest/water/getServiceCharge', postdata).then(function(data){
      return $http.post(api.brmsurl + 'services/rest/rti/brmsrtiservice/servicecharge', chargeData).then(function (data) {
        return data.data;
      });
    };
    api.getAllComplaints = function (tokennumber) {
      console.log("All complaint URL:",api.serviceURL + 'mobility/grievance/careRequests/search')

      let payload = {
        "mobileNumber": tokennumber
      }
      console.log("All complaint payload",payload)
      return $http.post(api.serviceURL + 'mobility/grievance/careRequests/search', payload)
        .then(function (data) {
          return data.data;
        });
    }
    api.saveProfileEdit = function (profileData) {
      console.log("edited Data----" + JSON.stringify(profileData));
      //  return $http.post('http://192.168.100.118:8092/portalrest/registrationController/editUserProfileForMobile', profileData).then(function(data){
      return $http.post(api.eipUrl + 'registrationController/editUserProfileForMobile', profileData).then(function (data) {
        return data.data;
      });
    };
    //getServertime
    api.getServertime = function () {
      var value = {
        orgId: 0
      }
      return $http.post(api.cxfServiceUrl + 'rest/brmsrtirestservice/getCurentTime', value).then(function (data) {
        console.log("server Time" + data.data)
        return data.data;
      });
    };
    //getDashBoardData
    api.getDashBoardData = function (params) {

      return $http.post(api.cxfServiceUrl + 'services/rest/common/citizenDashboard/getDashBoardData', params).then(function (data) {
        console.log("getDashBoardData=", data.data);
        return data.data;
      });
    };

    //getDashBoardDataAction
    api.getDashBoardDataAction = function (id, lang) {

      return $http.post(api.cxfServiceUrl + 'services/rest/common/workflow/action/uuid/' + id + '/lang/' + lang, {}).then(function (data) {
        console.log("getDashBoardDataAction=", data.data);
        return data.data;
      });
    };
    //getPayPendingDashBoardData
    api.getPayPendingDashBoardData = function (params) {

      return $http.post(api.cxfServiceUrl + 'rest/citizenDashboard/getPayPendingDashBoardData', params).then(function (data) {
        console.log("getPayPendingDashBoardData=", data.data);
        return data.data;
      });
    };

 //getLOIData
 api.getLOIData = function (params) {

  return $http.post(api.cxfServiceUrl + 'rest/citizenDashboard/getLoiInformation', params).then(function (data) {
    console.log("getLOIData=", data.data);
    return data.data;
  });
};

    //savePaymentRequest
    api.savePaymentRequest = function (params) {

      return $http.post(api.cxfServiceUrl + 'rest/commonPaymentController/savePaymentRequest', params).then(function (data) {
        console.log("savePaymentRequest=", data.data);
        return data.data;
      });
    };

    //fetchInformationByApplicationid RTI
    api.fetchInformationByApplicationid = function (id, orgid) {

      return $http.post(api.cxfServiceUrl + 'services/rest/rti/brmsrtiservice/fetchInformationByApplicationid/' + id + '/' + orgid, {}).then(function (data) {
        console.log("fetchInformationByApplicationid=", data.data);
        return data.data;
      });
    };

    // api.getAccessToken = function () {
    //   var params = {
    //     // "authorizationKey": "Sk1BX1dUM2FXRlNrTzhnV3lvSldZSU5oSEEwYTpyOVh3a2hxVndVUFNOeWZSUGRXOHdQSXlZRFFh",
    //      "authorizationKey": "bmo2MFFJZmZaNExBRGRmMlpmUTVGSzVLZk9nYTpMeHo2UFNjQVp6bVNKX0M3azdBREVxTVpKczhh",
    //     "password": api.swmAdminPassword,
    //     "username": api.swmAdminName
    //   }
    //   var url = api.swmURL + 'trinityPlatform/1.0.0/getAccessToken';
    //   return $http.post(url, params).then(function (data) {
    //     return data.data;
    //   });
    // };

    api.getAccessToken = function () {
      var params = {
        
          "authorizationKey": "bmo2MFFJZmZaNExBRGRmMlpmUTVGSzVLZk9nYTpMeHo2UFNjQVp6bVNKX0M3azdBREVxTVpKczhh",
          "username":"abm",
          "password":"Welcome@123",
          "grantType": "password"
        
      
    }
      var url = api.swmURL + 'trinityPlatform/1.0.0/getAccessToken';
      return $http.post(url, params).then(function (data) {
        return data.data;
      });
    };

    api.getComplaintsTypes = function (token) {
      var swmauthHeader = new Headers();
      swmauthHeader.append('Authorization', "Bearer " + $rootScope.swmAccessToken);
      const headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Authorization': "Bearer " + $rootScope.swmAccessToken
      }
      const requestOptions = {
        headers: new Headers(headerDict),
      };
      var url = api.swmURL + 'trinityswm/1.0.0/swm/getComplaintsTypes';
      return $http.get(url, {
        headers: { 'Authorization': "Bearer " + $rootScope.swmAccessToken }
      }).then(function (data) {
        return data;
      });
    };

    api.registerComplaint = function (params) {
      var url = api.swmURL + 'swm/1.0.0/citizenComplaint/registerComplaint';
      console.log("uRL----" + url);
      return $http.post(url, params, {
        headers: { 'Authorization': "Bearer " + $rootScope.swmAccessToken }
      }).then(function (data) {
        return data.data;
      });
    };

    api.getComplaintList = function (phonNo) {
      // http://IP:PORT/trinityswm/1.0.0/swm/getComplaintList?phoneNo=889253503
      var url = api.swmURL + 'trinityswm/1.0.0/swm/getComplaintList?phoneNo=' + phonNo;
      console.log("uRL----" + url);
      return $http.get(url, {
        headers: { 'Authorization': "Bearer " + $rootScope.swmAccessToken }
      }).then(function (data) {
        return data.data;
      });
    };

    // api.getDistinctStops = function (tenantCode) {
    //   // http://IP:PORT/ITMS/getRoutes?tenantCode=TRINITYTEST
    //   var url = api.serviceURL + 'ITMS/getDistinctStops?tenantCode=TRINITYTEST?' + tenantCode;
    //   console.log("uRL----" + url);
    //   return $http.get(url).then(function (data) {
    //     return data.data;
    //   });
    // };


    // api.getRoutes = function (tenantCode) {
    //   // http://IP:PORT/ITMS/getRoutes?tenantCode=TRINITYTEST
    //   var url = api.serviceURL + 'ITMS/getRoutes?tenantCode=' + tenantCode;
    //   console.log("uRL----" + url);
    //   return $http.get(url).then(function (data) {
    //     return data.data;
    //   });
    // };

    // api.getRouteTypes = function (routeName) {
    //   // http://IP:PORT/ITMS/getRouteTypes
    //   var params = {
    //     "routeName": routeName,
    //   }
    //   var url = api.serviceURL + 'ITMS/getRouteTypes';
    //   console.log("uRL----" + url);
    //   return $http.post(url, params).then(function (data) {
    //     return data.data;
    //   });
    // };

    // api.routeDetails = function (routeId) {
    //   // http://IP:PORT/ITMS/routeDetails
    //   var params = {
    //     "routeId": routeId,
    //   }
    //   var url = api.serviceURL + 'ITMS/routeDetails';
    //   console.log("uRL----" + url);
    //   return $http.post(url, params).then(function (data) {
    //     return data.data;
    //   });
    // };

    // api.nearByStops = function (params) {
    //   // http://IP:PORT/ITMS/nearByStops
    //   var params = { "tenantCode": "TRINITYTEST", "lat": 12.978673, "lon": 77.609452, "radius": 2000 }
    //   var url = api.serviceURL + 'ITMS/nearByStops';
    //   console.log("uRL----" + url);
    //   return $http.post(url, params).then(function (data) {
    //     return data.data;
    //   });
    // };

    // api.wayPointsDetails = function (routeId, fleetId) {
    //   // http://IP:PORT/ITMS/wayPointsDetails
    //   var params = { "routeId": 7591, "fleetId": 245 }
    //   var url = api.serviceURL + 'ITMS/wayPointsDetails';
    //   console.log("uRL----" + url);
    //   return $http.post(url, params).then(function (data) {
    //     return data.data;
    //   });
    // };

    // api.tripPlannerDetails = function (source, destination, time) {
    //   // http://IP:PORT/ITMS/tripPlannerDetails
    //   var params = { "source": "Stop 1", "destination": "Stop 3", "time": "21:00:00" }
    //   var url = api.serviceURL + 'ITMS/tripPlannerDetails';
    //   console.log("uRL----" + url);
    //   return $http.post(url, params).then(function (data) {
    //     return data.data;
    //   });
    // };

    // api.scheduledTripDetails = function (routeId) {
    //   // http://IP:PORT/ITMS/scheduledTripDetails
    //   var params = { "routeId": 7590 }
    //   var url = api.serviceURL + 'ITMS/scheduledTripDetails';
    //   console.log("uRL----" + url);
    //   return $http.post(url, params).then(function (data) {
    //     return data.data;
    //   });
    // };

    // api.arrivingBusesList = function (stopId) {
    //   // http://IP:PORT/ITMS/arrivingBusesList
    //   var params = { "stopId": 73 }
    //   var url = api.serviceURL + 'ITMS/arrivingBusesList';
    //   console.log("uRL----" + url);
    //   return $http.post(url, params).then(function (data) {
    //     return data.data;
    //   });
    // };

    // api.enroutedDetails = function (sourceId, destinationId, routeId) {
    //   // http://IP:PORT/ITMS/enroutedDetails
    //   var params = {
    //     "sourceId": 0,
    //     "destinationId": 0,
    //     "routeId": 9618
    //   }
    //   var url = api.serviceURL + 'ITMS/enroutedDetails';
    //   console.log("uRL----" + url);
    //   return $http.post(url, params).then(function (data) {
    //     return data.data;
    //   });
    // };

    api.createGrievance = function (sourceId, destinationId, routeId) {
      // http://IP:PORT/ITMS/createGrievance
      var params = {
        "sourceId": 0,
        "destinationId": 0,
        "routeId": 9618
      }
      var url = api.serviceURL + 'ITMS/createGrievance';
      console.log("uRL----" + url);
      return $http.post(url, params).then(function (data) {
        return data.data;
      });
    };

    api.getComplaints = function (email, phoneNo, jabberId, offset, citizenAppComplaint, citizenChatComplaint, citizenChatBotComplaints) {
      // http://IP:PORT/ITMS/getComplaints
      var params = {
        "email": "rajath@gmail.com",
        "phoneNo": "9880732289",
        "jabberId": "rajath",
        "offset": 0,
        "citizenAppComplaint": true,
        "citizenChatComplaint": true,
        "citizenChatBotComplaints": true
      }
      var url = api.serviceURL + 'ITMS/getComplaints';
      console.log("uRL----" + url);
      return $http.post(url, params).then(function (data) {
        return data.data;
      });
    };

    api.getIncidentSubTypes = function (tenantCode) {
      //http://IP:PORT/ITMS/getIncidentSubTypes
      var url = api.serviceURL + 'ITMS/getIncidentSubTypes?tenantCode=' + tenantCode;
      console.log("uRL----" + url);
      return $http.get(url).then(function (data) {
        return data.data;
      });
    };
    api.getAccessToken = function () {
      var params = {
       
          "authorizationKey": "bmo2MFFJZmZaNExBRGRmMlpmUTVGSzVLZk9nYTpMeHo2UFNjQVp6bVNKX0M3azdBREVxTVpKczhh",
          "username":"abm",
          "password":"Welcome@123",
          "grantType": "password"
       
     
    }
      var url = api.swmURL + 'trinityPlatform/1.0.0/getAccessToken';
      return $http.post(url, params).then(function (data) {
        return data.data;
      });
    };
    api.getTrafficList = function () {
     
      return $http.get('https://dscliothub.uk.gov.in:5151/tis/api/rest/atcs/getCongestionData.php?licence=ccT0F804bU8093N3900I5ff4Sfe49Ob58aS3b&client=DSCL&limit=20').then(function (data) {
        return data.data;
      });
    };

    // api.getGrievanceStatus = function (tokennumber, langID) {
    //   console.log("tokennumber-" + tokennumber + "langID-" + langID);
    //   //return $http.post(api.serviceURL + 'mobility/grievance/careRequests/acknowledgement/complaintId/' + tokennumber + '/' + langID)
    // return $http.post(api.serviceURL + 'mobility/grievance/careRequests/acknowledgement/applicationId/' + tokennumber + '/' + langID)
    //     .then(function (data) {
    //       return data.data;
    //     });
    // };
    api.fetchInformationByApplicationid = function (id, orgid) {

      return $http.post(api.cxfServiceUrl + 'services/rest/rti/brmsrtiservice/fetchInformationByApplicationid/' + id + '/' + orgid, {}).then(function (data) {
        console.log("fetchInformationByApplicationid=", data.data);
        return data.data;
      });
    };
    api.getComplaintList = function (phonNo) {
      // http://IP:PORT/trinityswm/1.0.0/swm/getComplaintList?phoneNo=889253503
      var url = api.swmURL + 'trinityswm/1.0.0/swm/getComplaintList?phoneNo=' + phonNo;
      console.log("uRL----" + url);
      return $http.get(url, {
        headers: { 'Authorization': "Bearer " + $rootScope.swmAccessToken }
      }).then(function (data) {
        return data.data;
      });
    };
    api.getComplaintList = function (phonNo) {
      // http://IP:PORT/trinityswm/1.0.0/swm/getComplaintList?phoneNo=889253503
      var url = api.swmURL + 'trinityswm/1.0.0/swm/getComplaintList?phoneNo=' + phonNo;
      console.log("uRL----" + url);
      return $http.get(url, {
        headers: { 'Authorization': "Bearer " + $rootScope.swmAccessToken }
      }).then(function (data) {
        return data.data;
      });
    };
    // On going Projects & Popular Places
// On going Projects & Popular Places

api.getOnGoingProjects = function (end) {
     
  var url = api.eipUrl + end;
  console.log("uRL----" + url);
  return $http.get(url).then(function (data) {
    return data.data;
  });
};
    // api.getOnGoingProjects = function (langID) {
     
    //   var url = "https://dsclegov.uk.gov.in/dscl/portalrest/section/name/On%20Going%20Projects%20/lang/" + langID + "/org/1"
    //   console.log("uRL----" + url);
    //   return $http.get(url).then(function (data) {
    //     return data.data;
    //   });
    // };

    // api.getPopularPlaces = function (langID) {
     
    //   var url = "https://dsclegov.uk.gov.in/dscl/portalrest/section/name/Dehradun%20Tourist%20Locations%20/lang/" + langID + "/org/1";
    //   console.log("uRL----" + url);
    //   return $http.get(url).then(function (data) {
    //     return data.data;
    //   });
    // };
    // Important Links

    api.getOpenLinks = function (end) {
      
      var url = api.eipUrl + end;
      console.log("uRL----" + url);
      return $http.get(url).then(function (data) {
        return data.data;
      });
    };


    api.getIncidentTypes = function (tenantCode) {
      //http://IP:PORT/ITMS/getIncidentTypes
      var url = api.serviceURL + 'ITMS/getIncidentTypes?tenantCode=' + tenantCode;
      console.log("uRL----" + url);
      return $http.get(url).then(function (data) {
        return data.data;
      });
    };
    api.createSosAlarm = function (sourceId, destinationId, routeId) {
      // http://IP:PORT/ITMS/createSosAlarm
      var params = {
        "sourceId": 0,
        "destinationId": 0,
        "routeId": 9618
      }
      var url = api.serviceURL + 'ITMS/createSosAlarm';
      console.log("uRL----" + url);
      return $http.post(url, params).then(function (data) {
        return data.data;
      });
    };

    api.getComplaintById = function (incidentId, grievanceId, sourceType) {
      // http://IP:PORT/ITMS/getComplaintById
      var params = {
        "incidentId": "INC-20200928-2239",
        "grievanceId": "GV-20200508-002922",
        "sourceType": "Incident"
      }
      var url = api.serviceURL + 'ITMS/getComplaintById';
      console.log("uRL----" + url);
      return $http.post(url, params).then(function (data) {
        return data.data;
      });
    };

    api.getGrievanceLifeCycle = function (incidentId, grievanceId) {
      // http://IP:PORT/ITMS/getGrievanceLifeCycle
      var params = {
        "incidentId": "INC-20200928-2331",
        "grievanceId": "GV-20200508-002922"
      }
      var url = api.serviceURL + 'ITMS/getGrievanceLifeCycle';
      console.log("uRL----" + url);
      return $http.post(url, params).then(function (data) {
        return data.data;
      });
    };


    api.getFareDetails = function (srcId, destId, routeId) {
      // http://IP:PORT/ITMS/getFareDetails
      var params = {
        "srcId": 117,
        "destId": 306,
        "routeId": 0
      }
      var url = api.serviceURL + 'ITMS/getFareDetails';
      console.log("uRL----" + url);
      return $http.post(url, params).then(function (data) {
        return data.data;
      });
    };

    api.insertCitizenFeedback = function (userName, contactNo, emailId, description, rating, reason) {
      // http://IP:PORT/ITMS/insertCitizenFeedback
      var params = {
        "userName": "Anupama",
        "contactNo": "9999999999",
        "emailId": "anupama@gmail.com",
        "description": "moderate",
        "rating": 3,
        "reason": "City App login process is too clumsy"
      }
      var url = api.serviceURL + 'ITMS/insertCitizenFeedback';
      console.log("uRL----" + url);
      return $http.post(url, params).then(function (data) {
        return data.data;
      });
    };

    api.timeTableDetails = function (routeId, time) {
      // http://IP:PORT/ITMS/timeTableDetails
      var params = {
        "routeId": 9617,
        "time": "07:00"
      }
      var url = api.serviceURL + 'ITMS/timeTableDetails';
      console.log("uRL----" + url);
      return $http.post(url, params).then(function (data) {
        return data.data;
      });
    };

    api.innovativeIdea = function (postData) {
      var url = api.eipUrl + '/opinionpoll/innovativeIdea/1';
      return $http.post(url, postData).then(function (response) {
        return response.data;
      });
    };

    api.feedbacklist = function (orgid) {
      var postData = { lookUpCode: "IIC", orgId: 1 }
      return $http.post(api.serviceURL + 'MainetService/rest/commonService/retriveNonHData', postData)
        .then(function (data) {
          return data.data;
        });
    };

    //getDashBoardData
    // api.getTrafficList = function () {
    //   return $http.get('http://103.116.27.198/tis/api/rest/atcs/getCongestionData.php?licence=ccT0F804bU8093N3900I5ff4Sfe49Ob58aS3b&client=DSCL&limit=20').then(function (data) {
    //     return data.data;
    //   });
    // };

    // api.getEnvironmentAccessToken = function () {
    //   var params = {
    //     "authorizationKey": "Sk1BX1dUM2FXRlNrTzhnV3lvSldZSU5oSEEwYTpyOVh3a2hxVndVUFNOeWZSUGRXOHdQSXlZRFFh",
    //     "password": "123456",
    //     "username": "ICCC"
    //   }
    //   var url = api.enviornmentURL + 'trinityPlatform/1.0.0/getAccessToken';
    //   console.log("uRL----" + url)
    //   return $http.post(url, params).then(function (response) {
    //     console.log(response);
    //     return response.data;
    //   });
    // };

    api.getEnvironmentAccessToken = function () {
      // http://IP:PORT/ITMS/timeTableDetails
      // var params = {
      //   "authorizationKey": "Sk1BX1dUM2FXRlNrTzhnV3lvSldZSU5oSEEwYTpyOVh3a2hxVndVUFNOeWZSUGRXOHdQSXlZRFFh",
      //   "password": "123456",
      //   "username": "ICCC"
      // }
      var params = {
        "authorizationKey": "bmo2MFFJZmZaNExBRGRmMlpmUTVGSzVLZk9nYTpMeHo2UFNjQVp6bVNKX0M3azdBREVxTVpKczhh",
        "username":"abm",
        "password":"Welcome@123",
        "grantType": "password"
      }
      var url = api.enviornmentURL + 'trinityPlatform/1.0.0/getAccessToken';
      return $http.post(url, params).then(function (data) {
        return data;
      });
    };

    api.getEnviornmentData = function (token, mackid) {
      var url = api.enviornmentURL + 'Environment/1.0.0/Environment/getEnvironmentData?macid=' + mackid;
      console.log("uRL----" + url);
      return $http.get(url, {
        //headers: { 'Authorization': "Bearer " + token }
        headers: { 'Authorization': "Bearer" +  " " + " " + $rootScope.swmAccessTokenEnv }
      }).then(function (data) {
        return data.data;;
      });
    };

    api.retriveNonHData = function (token) {
      var params = {
        "lookUpCode": "SNS", "orgId": 1
      }
     
      var url = api.serviceURL + 'commonService/retriveNonHData';
      return $http.post(url, params).then(function (data) {
        return data.data;
      });
    };

    api.getEchallanById = function (challanId) {
      // var header = cordova.plugin.http.getBasicAuthHeader('user', 'password');
      // for IOS api
    var url = 'https://paychallanitmsddn.uk.gov.in:8082/eTmcsserver/getChallanById/' +  challanId;
    // for Android api
    // var url = 'https://103.116.27.96:8082/eTmcsserver/getChallanById/' + challanId ;
       //var url = 'https://dsclegov.uk.gov.in:8082/eTmcsserver/getChallanById/' + challanId;
       //var url = 'https://dsclegov.uk.gov.in/dscl/eTmcsserver/getChallanById/' + challanId;
    // var url =  'https://paychallanitmsddn.uk.gov.in/eTmcsserver/getChallanById/' + challanId ;
      console.log(url,"chalan url....")
       return $http.get(url, {
         headers: {
        'Authorization': 'Basic YXBpb25lOkFwaUAxMTA='
        
 
        }
       }).then(function (data) {
 
         // alert("API response= "+ JSON.stringify(data.data));
         console.log(data,"chalan rest data....")
       return data.data;
       });
    
     };
 
    ///ITS
    api.getPropertyTaxId = function (challanId) {
      // var header = cordova.plugin.http.getBasicAuthHeader('user', 'password');
     var url = 'http://103.116.27.197/dscl/portalrest/servicePortal/searchPropertyTax?consumerCode='+ challanId +'&tenantId=uk.dehradun&businessService=PT'
     return $http.post(url).then(function (data) {
      return data.data;
    });
     
     };

     

     api.getPropertyTaxToken = function () {
      var url = api.eipUrl +'/servicePortal/getAuthToken';
      return $http.get(url, {
        headers: { 'Authorization': 'Basic ZWdvdi11c2VyLWNsaWVudDplZ292LXVzZXItc2VjcmV0' }
      }).then(function (data) {
        return data;
      });
       
     };

     api.properyPayment = function(postData){
      var authHeader = new Headers();
      authHeader.append('Content-Type', 'application/json');
      return $http.post("https://nagarsewa-uat.uk.gov.in/collection-services/payments/_create", postData,
        { headers: authHeader }).then(function (data) {
          return data;
        });
     }


    // api.getDistinctStops = function () {
    //   // http://IP:PORT/ITMS/timeTableDetails
    //   // var url = api.swmURL + 'trinityITMS/1.0.0/ITMS/getDistinctStops?tenantCode=DSCL';
    //   var url = api.swmURL + 'trinityITMS/1.0.0/ITMS/getDistinctStops?tenantCode=DSCL';
    //   return $http.get(url, {
    //     headers: { 'Authorization': "Bearer " + $rootScope.swmAccessToken }
    //   }).then(function (data) {
    //     return data;
    //   });
    // };
    api.getDistinctStops = function () {
      // http://IP:PORT/ITMS/timeTableDetails
      // var url = api.swmURL + 'trinityITMS/1.0.0/ITMS/getDistinctStops?tenantCode=DSCL';
      var url = api.swmURL + 'trinityITMS/1.0.0/ITMS/getDistinctStops?tenantCode=dscl';
      console.log($rootScope.swmAccessTokenData,"service token access")
      return $http.get(url, {
        headers: { 'Authorization': "Bearer" +  " " + " " + $rootScope.swmAccessTokenData }
      }).then(function (data) {
        return data;
      });
    };
    // api.nearByBusStops = function (params) {
    //   var url = api.swmURL + 'trinityITMS/1.0.0/ITMS/nearByStops';
    //   return $http.post(url, params, {
    //     headers: { 'Authorization': "Bearer " + $rootScope.swmAccessToken }
    //   }).then(function (data) {
    //     return data;
    //   });
    // };

    api.nearByBusStops = function (params) {
      var url = api.swmURL + 'trinityITMS/1.0.0/ITMS/nearByStops';
      return $http.post(url, params, {
        headers: { 'Authorization': "Bearer" +  " " + " " + $rootScope.swmAccessTokenData }
      }).then(function (data) {
        return data;
      });
    };

    api.arrivingBusesList = function (params) {
      // http://IP:PORT/ITMS/timeTableDetails
      var url = api.swmURL + 'trinityITMS/1.0.0/ITMS/arrivingBusesList';
      return $http.post(url, params, {
        headers: { 'Authorization': "Bearer" +  " " + " " + $rootScope.swmAccessTokenData }
      }).then(function (data) {
        return data;
      });
    };


    // api.arrivingBusesList = function (params) {
    //   // http://IP:PORT/ITMS/timeTableDetails

    //   var url = api.swmURL + 'trinityITMS/1.0.0/ITMS/arrivingBusesList';
    //   return $http.post(url, params, {
    //     headers: { 'Authorization': "Bearer " + $rootScope.swmAccessToken }
    //   }).then(function (data) {
    //     return data;
    //   });
    // };


    // api.arrivingBusesList = function () {
    //   // http://IP:PORT/ITMS/timeTableDetails
    //   var params = { "stopId": 73 }
    //   var url = api.swmURL+'ITMS/arrivingBusesList';
    //   return $http.post(url, params, {
    //     headers: { 'Authorization': "Bearer " + $rootScope.swmAccessToken }
    //   }).then(function (data) {
    //     return data;
    //   });
    // };


    api.enroutedDetails = function (params) {
      // http://IP:PORT/ITMS/timeTableDetails

      var url = api.swmURL + 'trinityITMS/1.0.0/ITMS/enroutedDetails';
      return $http.post(url, params, {
        headers: { 'Authorization': "Bearer " + $rootScope.swmAccessToken }
      }).then(function (data) {
        return data;
      });
    };

    api.tripPlannerDetails = function (params) {
      // http://IP:PORT/trinityITMS/1.0.0/ITMS/timeTableDetails

      var url = api.swmURL + 'trinityITMS/1.0.0/ITMS/tripPlannerDetails';
      return $http.post(url, params, {
        headers: { 'Authorization': "Bearer " + $rootScope.swmAccessToken }
      }).then(function (data) {
        return data;
      });
    };

    api.getFareDetails = function (params) {
      // http://IP:PORT/trinityITMS/1.0.0/ITMS/timeTableDetails

      var url = api.swmURL + 'trinityITMS/1.0.0/ITMS/getFareDetails';
      return $http.post(url, params, {
        headers: { 'Authorization': "Bearer " + $rootScope.swmAccessToken }
      }).then(function (data) {
        return data;
      });
    };

    //////////////BY Route////////////

    // api.getRoutes = function () {
    //   // http://IP:PORT/trinityITMS/1.0.0/ITMS/timeTableDetails
    //   var url = api.swmURL + 'trinityITMS/1.0.0/ITMS/getRoutes?tenantCode=DSCL';
    //   return $http.get(url, {
    //     headers: { 'Authorization': "Bearer " + $rootScope.swmAccessToken }
    //   }).then(function (data) {
    //     return data;
    //   });
    // };

    api.getRoutes = function () {
      // http://IP:PORT/trinityITMS/1.0.0/ITMS/timeTableDetails
      var url = api.swmURL + 'trinityITMS/1.0.0/ITMS/getRoutes?tenantCode=DSCL';
      return $http.get(url, {
        headers: { 'Authorization': "Bearer" +  " " + " " + $rootScope.swmAccessTokenData }
      }).then(function (data) {
        return data;
      });
    };

    api.getRouteTypes = function () {
      // http://IP:PORT/trinityITMS/1.0.0/ITMS/timeTableDetails
      var params = {
        "routeName": "R100"
      }
      var url = api.swmURL + 'trinityITMS/1.0.0/ITMS/getRouteTypes';
      return $http.post(url, params, {
        headers: { 'Authorization': "Bearer " + $rootScope.swmAccessToken }
      }).then(function (data) {
        return data;
      });
    };

    api.timeTableDetails = function () {
      // http://IP:PORT/trinityITMS/1.0.0/ITMS/timeTableDetails
      var params = {
        "routeId": 9617,
        "time": "07:00"
      }
      var url = api.swmURL + 'trinityITMS/1.0.0/ITMS/timeTableDetails';
      return $http.post(url, params, {
        headers: { 'Authorization': "Bearer " + $rootScope.swmAccessToken }
      }).then(function (data) {
        return data;
      });
    };
    api.routeDetails = function () {
      // http://IP:PORT/trinityITMS/1.0.0/ITMS/timeTableDetails
      var params = {
        "routeId": 9617
      }
      var url = api.swmURL + 'trinityITMS/1.0.0/ITMS/routeDetails';
      return $http.post(url, params, {
        headers: { 'Authorization': "Bearer " + $rootScope.swmAccessToken }
      }).then(function (data) {
        return data;
      });
    };

    api.scheduledTripDetails = function () {
      // http://IP:PORT/trinityITMS/1.0.0/ITMS/timeTableDetails
      var params = {
        "routeId": 9617
      }
      var url = api.swmURL + 'trinityITMS/1.0.0/ITMS/scheduledTripDetails';
      return $http.post(url, params, {
        headers: { 'Authorization': "Bearer " + $rootScope.swmAccessToken }
      }).then(function (data) {
        return data;
      });
    };

    api.wayPointsDetails = function () {
      // http://IP:PORT/trinityITMS/1.0.0/ITMS/timeTableDetails
      var params = {
        "routeId": 7591, "fleetId": 245
      }
      var url = api.swmURL + 'trinityITMS/1.0.0/ITMS/wayPointsDetails';
      return $http.post(url, params, {
        headers: { 'Authorization': "Bearer " + $rootScope.swmAccessToken }
      }).then(function (data) {
        return data;
      });
    };

    api.getMDDALid = function()
    {
      var params = {
        "username": ENV.MDDA_USER_NAME, "password": ENV.MDDA_PASSWORD
      }
      var url = ENV.MDDA_AUTH_URL;     
      return $http.post(url, params).then(function (data) {
        return data;
                   
      });

    }

    api.getMDDAProjectSummary = function (mlid) {
      // http://IP:PORT/trinityITMS/1.0.0/ITMS/timeTableDetails
      
      var url = ENV.MDDA_GET_SUMMARY;
      return $http.post(url,mlid,{
        headers: { 'lid': mlid}
      }).then(function (data) {
        return data;
      });
    };

    api.getJwtToken = function (orgId,userId){

      var url = api.eipUrl + 'servicePortal/getJwtToken/' + orgId + '/' + userId;
      console.log('getJwtToken url-->',url);
      return $http.post(url).then(function(data){
        return data.data;
      });

    }

    api.getYourWardZoneByLoc = function (latitude,longitude) {
      
      var token = "Bearer" + " " + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjoiZGVocmFkdW4iLCJQYXNzd29yZCI6ImFkbWluQDEyMyIsIlByb2plY3QiOiJzYzEwX2RlaHJhZHVuX3BnIiwiSG9zdCI6IjEwLjY3LjE3MS40NyIsIlBvcnQiOjU0MzIsInR5cGUiOiJQcm9mZXNzaW9uYWwiLCJpYXQiOjE2MTkyNjQxNzMsImF1ZCI6InNnbDpQcm9mZXNzaW9uYWwiLCJpc3MiOiJzZ2wudGxkIn0.qiQihyNiwE6H2XVEa11aWxN3AhFK9U6aCRPFUUYtb30cn9jc4yeTAt4I2jOp5sX3qlsYKNRtB2nkGGSUn7bBm6J33HFQC692LjRaDeTszI6BcNmGJTD9Ewr9nEDJY_0EUub0hC5uafVt0i4kZbCB6saW4P1vRzyGeO7WwKeEuBw"
      var url = 'https://dsclgis.uk.gov.in:8443/IGISRestAPI/Geocoder/GetPlaceFromLayer/boundary_ward/ward_name/'+latitude+'/'+longitude+'/200/1'

      console.log(url,"my url location....")
      
      return $http.get(url,{
        headers: { 'Authorization': token}
      }).then(function (data) {
        return data.data;
      });
      
    };

    api.getYourNearByPlaces = function (param1,param2,distance,recordNo,latitude,longitude) {
      
      var token = "Bearer" + " " + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjoiZGVocmFkdW4iLCJQYXNzd29yZCI6ImFkbWluQDEyMyIsIlByb2plY3QiOiJzYzEwX2RlaHJhZHVuX3BnIiwiSG9zdCI6IjEwLjY3LjE3MS40NyIsIlBvcnQiOjU0MzIsInR5cGUiOiJQcm9mZXNzaW9uYWwiLCJpYXQiOjE2MTkyNjQxNzMsImF1ZCI6InNnbDpQcm9mZXNzaW9uYWwiLCJpc3MiOiJzZ2wudGxkIn0.qiQihyNiwE6H2XVEa11aWxN3AhFK9U6aCRPFUUYtb30cn9jc4yeTAt4I2jOp5sX3qlsYKNRtB2nkGGSUn7bBm6J33HFQC692LjRaDeTszI6BcNmGJTD9Ewr9nEDJY_0EUub0hC5uafVt0i4kZbCB6saW4P1vRzyGeO7WwKeEuBw"
      var url = 'https://dsclgis.uk.gov.in:8443/IGISRestAPI/Geocoder/GetPlaceFromLayer/'+param1+'/'+param2+'/'+latitude+'/'+longitude+'/'+distance+'/'+recordNo;

      console.log(url,"my url location....")
      
      return $http.get(url,{
        headers: { 'Authorization': token}
      }).then(function (data) {
        return data.data;
      });
      
    };

    //User story #161012
    api.complaintOtpService = function (mobileNo,orgid) {

      var postdata = {
        mobileNo: mobileNo,
        langId: $localStorage.langID,
        orgId: orgid       
      }

      return $http.post(api.eipUrl + 'registrationController/sendOtp', postdata).then(function (data) {
        return data.data;
      });
    };

    // http://103.116.27.152/MainetService/
    return api;
  });




