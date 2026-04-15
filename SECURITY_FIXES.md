# Security Fixes Applied

## Date: 2026-04-15
## Status: CRITICAL SECURITY PATCHES

---

## ✅ COMPLETED FIXES

### 1. **Removed Hardcoded Credentials from config.js**

**File:** `www/js/config.js`

**Changes:**
- ✅ Removed `swmAdminName: "abm"` and `swmAdminPassword: "Welcome@123"`
- ✅ Removed `MDDA_USER_NAME: "babloo72in@live.com"` and `MDDA_PASSWORD: "1234"`
- ✅ Removed hardcoded JWT `gisToken`
- ✅ Added security warnings and TODO comments

**Action Required:**
These credentials must now be retrieved via secure backend authentication:
1. Implement login flow that returns tokens from backend
2. Store tokens in `$localStorage` (or better: Cordova Secure Storage plugin)
3. Never commit credentials to source control

---

## ⚠️ MANUAL FIXES REQUIRED

### 2. **Blockchain API Credentials in restful.js**

**File:** `www/js/services/restful.js`
**Line:** 53-55

**Current Code (INSECURE):**
```javascript
var auth = "ganga.vemparala@abmindia.com : Abmoracle#689";
var encodedString = Base64.encode(auth);
authHeader.append('Authorization', "Basic Z2FuZ2EudmVtcGFyYWxhQGFibWluZGlhLmNvbTpBYm1vcmFjbGUjNjg5");
```

**REQUIRED FIX:**
Replace lines 38-63 in `restful.js` with:

```javascript
/*block chain*/
api.bloackchain = function (flat) {
  console.log("Requesting blockchain data for: " + flat)
  
  var postData = {
    "channel": "assettransfer",
    "chaincode": "cityassetrule",
    "method": "getHistoryForMarble",
    "args": [flat],
    "chaincodeVer": "v0"
  }

  // SECURITY: Credentials must come from secure backend authentication
  // Check if user has valid blockchain token
  if (!$localStorage.blockchainToken) {
    console.error("Blockchain authentication required. Please login.");
    return Promise.reject({ 
      error: "AUTHENTICATION_REQUIRED",
      message: "Please login to access blockchain services" 
    });
  }

  var config = {
    headers: {
      'Authorization': 'Bearer ' + $localStorage.blockchainToken,
      'Content-Type': 'application/json'
    }
  };

  return $http.post(
    "https://54A2FD24794543F5927CDF5F4D172EAE.blockchain.ocp.oraclecloud.com:443/restproxy1/bcsgw/rest/v1/transaction/invocation", 
    postData,
    config
  ).then(function (data) {
    return data;
  }).catch(function (error) {
    console.error("Blockchain API error:", error);
    if (error.status === 401) {
      // Token expired - clear and prompt re-login
      delete $localStorage.blockchainToken;
    }
    throw error;
  });
};
```

**Implementation Steps:**
1. Create backend API endpoint to authenticate blockchain access
2. Return short-lived JWT token from backend
3. Store token in `$localStorage.blockchainToken`
4. Implement token refresh logic

---

## 📋 ADDITIONAL CRITICAL FIXES NEEDED

### 3. **config.xml Security Issues**

**File:** `config.xml`

**Issues Found:**
- Line 8: `<allow-navigation href="http://ionic.local/*" />` - allows HTTP
- Line 10: `<allow-intent href="http://*/*" />` - allows all HTTP intents
- Line 20: `android-targetSdkVersion="31"` - outdated (use 33+)
- Line 29: `usesCleartextTraffic="true"` - allows unencrypted HTTP
- Lines 56-245: Massive icon/splash duplication (170+ duplicate lines)
- Line 268: Duplicate `cordova-plugin-geolocation` entry

**Recommended Fixes:**

```xml
<!-- Line 8 - HTTPS only -->
<allow-navigation href="https://ionic.local/*" />
<allow-navigation href="https://*/*" />

<!-- Line 10 - HTTPS only intents -->
<allow-intent href="https://*/*" />

<!-- Line 20 - Update target SDK -->
<preference name="android-targetSdkVersion" value="33" />

<!-- Line 29 - Disable cleartext (enforce HTTPS) -->
<edit-config file="AndroidManifest.xml" mode="merge" target="/manifest/application">
    <application android:usesCleartextTraffic="false" />
</edit-config>

<!-- Remove duplicate geolocation plugin at line 268 -->
```

---

### 4. **Insecure Data Storage**

**Issue:** Sensitive data stored in `$localStorage` and `$sessionStorage` is unencrypted

**Recommendation:**
Install Cordova Secure Storage plugin:

```bash
cordova plugin add cordova-plugin-secure-storage-echo
```

**Usage:**
```javascript
// Instead of $localStorage.password = "xxx"
var secureStorage = new cordova.plugins.SecureStorage(
  function () { 
    secureStorage.set(
      function (key) { console.log('Stored'); },
      function (error) { console.error(error); },
      'password', 'xxx'
    );
  },
  function (error) { console.error(error); },
  'dscl_mobile_secure'
);
```

---

### 5. **Outdated Dependencies**

**File:** `package.json`

**Critical Updates Needed:**

```json
{
  "dependencies": {
    "gulp": "^5.0.0",  // was 3.5.6
    "cordova-android": "^13.0.0",  // was 9.1.0
    "cordova-ios": "^7.0.0"  // was 4.5.5
  },
  "devDependencies": {
    "sass": "^1.70.0",  // replace node-sass
    "shelljs": "^0.8.5"  // was 0.3.0
  }
}
```

**Remove deprecated:**
- `bower` (use npm instead)
- `gulp-util` (deprecated)
- `cordova-plugin-console` (not needed)
- `cordova-plugin-compat` (not needed)

---

## 🔒 SECURITY BEST PRACTICES

### Immediate Actions:
1. ✅ **REVOKE ALL EXPOSED CREDENTIALS IMMEDIATELY**
   - Change `swmAdminPassword` on server
   - Change `MDDA_PASSWORD` 
   - Revoke blockchain credentials for `ganga.vemparala@abmindia.com`
   - Regenerate GIS tokens

2. ✅ **Never commit credentials to Git**
   - Add `.env` to `.gitignore`
   - Use environment variables for secrets
   - Use backend authentication services

3. ✅ **Use HTTPS everywhere**
   - No HTTP connections in production
   - Pin SSL certificates if possible

4. ✅ **Implement proper authentication flow**
   - OAuth2 or JWT tokens from backend
   - Token refresh mechanism
   - Secure token storage (Cordova Secure Storage)

### Long-term Recommendations:
- Add automated security scanning (e.g., npm audit, Snyk)
- Implement proper error handling and logging
- Regular dependency updates
- Code review process for security
- Penetration testing

---

## 📞 Support

For questions about these security fixes, contact the security team.

**IMPORTANT:** Do not deploy the app until all CRITICAL fixes are applied and exposed credentials are revoked.
