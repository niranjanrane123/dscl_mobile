//"use strict";

angular.module("starter")
  .constant("ENV", {
    name: "production",
   
  // Production url  start
  // https://smartcitydehradun.uk.gov.in/MainetService/rest/api/sos/create
      eipURL: "https://smartcitydehradun.uk.gov.in",
      baseURL: "https://dsclegov.uk.gov.in",
      brmsURL: "https://dsclegov.uk.gov.in",
      dashBoardURL: "https://dsclegov.uk.gov.in/DashboardDun/",
      portalURL: "https://smartcitydehradun.uk.gov.in/dscl",
      apuniSarkarURL:"https://eservices.uk.gov.in/user/login/smartcity?token=",
      environment:'production',
  
  // Production URL end

   // UAT start working 13-12-24(works only after connecting to VPN)
  //  eipURL: "http://10.67.169.17:8065",      
  //  baseURL: "http://10.67.169.17:8065",
  //  brmsURL: "http://10.67.169.17:8065", 
  //  portalURL: "http://10.67.169.17:8065/dscl",
  //  dashBoardURL: "http://10.67.169.17:8065/DashboardDun/",
  //  apuniSarkarURL:"https://13.232.191.11/e-district-uk-client-user/login/smartcity?token=",

// UAT End working

  // new changes for UAT start
      // eipURL: "http://103.116.27.198",            
      // baseURL: "http://103.116.27.198",
      // brmsURL: "http://103.116.27.198", 
      // portalURL: "http://103.116.27.198/dscl",
      // dashBoardURL: "http://103.116.27.198/DashboardDun/",
      // apuniSarkarURL:"https://13.232.191.11/e-district-uk-client-user/login/smartcity?token=",

  //new changes for UAT end

  // new changes for UAT start
      // eipURL: "http://103.116.27.197:8065",          //portalrest APIs are not working   
      /* baseURL: "http://103.116.27.197:8065",  
      brmsURL: "http://103.116.27.197:8065/", 
      portalURL: "http://103.116.27.197:8065/dscl",
      dashBoardURL: "http://103.116.27.197:8065/DashboardDun/",
      apuniSarkarURL:"https://13.232.191.11/e-district-uk-client-user/login/smartcity?token=", */

  //new changes for UAT end

      // environment:'uat',

      //<--UAT private IP start-->

     /*  eipURL: "http://10.67.169.15:8075",
      baseURL: "http://10.67.169.17:8065",  
      brmsURL: "http://10.67.169.17:8065", 
      dashBoardURL: "http://10.67.169.17:8065/DashboardDun/",
      portalURL: "http://10.67.169.15:8075/dscl",       
      apuniSarkarURL:"https://13.232.191.11/e-district-uk-client-user/login/smartcity?token=", */

      //<--UAT private IP end-->

    // Third Party APIs same for UAT & Production
    // swMURL: "http://103.116.27.194:8283/",
    // enviornmentURL: "http://103.116.27.194:8283/",
    swMURL: "https://dscliothub.uk.gov.in/api/",
    enviornmentURL: "https://dscliothub.uk.gov.in/api/",
    ITSURL: "https://dscliothub.uk.gov.in/api/",
    trafficURL:'http://dscliothub.uk.gov.in:5151/',
    upclURL:'https://www.upcl.org/',
    jalSansthanURL:'https://ujsbill.uk.gov.in/auth/BillPay.aspx?c=',
    // SECURITY WARNING: Credentials removed from source code
    // swmAdminName and swmAdminPassword should be retrieved from secure backend authentication
    // These should NEVER be hardcoded in the client-side code
    swmAdminName: null,  // TODO: Implement secure authentication flow
    swmAdminPassword: null,  // TODO: Implement secure authentication flow
    // SECURITY WARNING: Static JWT tokens removed from source code
    // GIS tokens should be fetched dynamically from backend with proper expiration handling
    // JWT tokens expire and should NEVER be hardcoded
    gisToken: null,  // TODO: Implement dynamic token fetch with refresh mechanism


    PUSHBOTS_APP_ID: "56779c061779594a6d8b456f",
    GCM_SENDER_ID: "1084889111210",

    // SOS API
    sosApi: "https://api.uk.ners.in/interconnect/api/event/create",

     // MDDA Authentication
     // SECURITY WARNING: Credentials removed from source code
     // These should be retrieved from secure backend authentication or environment variables
     MDDA_USER_NAME: null,  // TODO: Implement secure authentication flow
     MDDA_PASSWORD: null,  // TODO: Implement secure authentication flow
     MDDA_AUTH_URL: "https://mddaonline.org.in/mdda/rest/auth/authenticatePublicUser",  
     MDDA_GET_SUMMARY: "https://mddaonline.org.in/mdda/rest/dashboard/getSummary",

  });


