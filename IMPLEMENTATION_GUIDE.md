# Security Fixes Implementation Guide

## Prerequisites
- Backup your codebase before making changes
- Coordinate with backend team for authentication endpoints
- Prepare to revoke all exposed credentials

---

## STEP 1: REVOKE EXPOSED CREDENTIALS (CRITICAL - DO FIRST)

### Action Items:
1. **SWM Admin Credentials**
   - Current: `swmAdminName: "abm"`, `swmAdminPassword: "Welcome@123"`
   - Action: Change password on SWM admin portal immediately

2. **MDDA Credentials**
   - Current: `MDDA_USER_NAME: "babloo72in@live.com"`, `MDDA_PASSWORD: "1234"`
   - Action: Change password for this account

3. **Blockchain API**
   - Current: `ganga.vemparala@abmindia.com : Abmoracle#689`
   - Action: Revoke API access for this account or change password
   - Contact: Oracle Blockchain Cloud admin

4. **GIS Token**
   - Current: Hardcoded JWT in config.js
   - Action: Revoke/regenerate token via GIS admin panel

**Timeline:** Complete within 24 hours of discovering exposure

---

## STEP 2: FIX RESTFUL.JS BLOCKCHAIN FUNCTION

### File: `www/js/services/restful.js`

**Option A: Manual Edit**
1. Open `www/js/services/restful.js` in your editor
2. Locate lines 38-63 (the `bloackchain` function)
3. Replace entire function with code from `SECURITY_FIXES.md` section 2
4. Save file

**Option B: Programmatic (if file is too large for editor)**
```bash
# Backup first
cp www/js/services/restful.js www/js/services/restful.js.backup

# Use sed or awk to replace specific lines
# (Platform-specific command needed)
```

**Expected Result:**
- No hardcoded credentials
- Uses `$localStorage.blockchainToken` 
- Proper error handling for 401 responses

---

## STEP 3: CREATE BACKEND AUTHENTICATION ENDPOINTS

### Required Endpoints:

#### 1. Login Endpoint
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "securePassword"
}

Response:
{
  "success": true,
  "tokens": {
    "swmToken": "jwt_token_here",
    "mddaToken": "jwt_token_here",
    "blockchainToken": "jwt_token_here",
    "gisToken": "jwt_token_here"
  },
  "expiresIn": 3600
}
```

#### 2. Token Refresh Endpoint
```http
POST /api/auth/refresh
Authorization: Bearer <refresh_token>

Response:
{
  "success": true,
  "accessToken": "new_jwt_token",
  "expiresIn": 3600
}
```

#### 3. Blockchain Proxy Endpoint (Recommended)
Instead of client calling blockchain directly, proxy through backend:

```http
POST /api/blockchain/transaction
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "channel": "assettransfer",
  "chaincode": "cityassetrule",
  "method": "getHistoryForMarble",
  "args": ["FLAT_ID"],
  "chaincodeVer": "v0"
}
```

Backend verifies user JWT, then uses service account to call Oracle Blockchain.

---

## STEP 4: UPDATE MOBILE APP AUTHENTICATION

### File: Create `www/js/services/authService.js`

```javascript
angular.module('starter.services')
.factory('AuthService', function($http, $localStorage, $rootScope, API_ENDPOINT) {
  
  var service = {
    login: function(username, password) {
      return $http.post(API_ENDPOINT + '/api/auth/login', {
        username: username,
        password: password
      }).then(function(response) {
        if (response.data.success) {
          // Store tokens securely
          $localStorage.swmToken = response.data.tokens.swmToken;
          $localStorage.mddaToken = response.data.tokens.mddaToken;
          $localStorage.blockchainToken = response.data.tokens.blockchainToken;
          $localStorage.gisToken = response.data.tokens.gisToken;
          $localStorage.tokenExpiry = Date.now() + (response.data.expiresIn * 1000);
          
          $rootScope.isLoggedIn = true;
          return response.data;
        }
      });
    },
    
    logout: function() {
      delete $localStorage.swmToken;
      delete $localStorage.mddaToken;
      delete $localStorage.blockchainToken;
      delete $localStorage.gisToken;
      delete $localStorage.tokenExpiry;
      $rootScope.isLoggedIn = false;
    },
    
    isTokenValid: function() {
      if (!$localStorage.tokenExpiry) return false;
      return Date.now() < $localStorage.tokenExpiry;
    },
    
    refreshToken: function() {
      // Implementation depends on your refresh token strategy
      return $http.post(API_ENDPOINT + '/api/auth/refresh')
        .then(function(response) {
          $localStorage.swmToken = response.data.accessToken;
          $localStorage.tokenExpiry = Date.now() + (response.data.expiresIn * 1000);
        });
    }
  };
  
  return service;
});
```

### File: Update `www/js/app.js`

Add authentication check to route changes:

```javascript
$rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
  // Check if route requires authentication
  if (toState.data && toState.data.requiresAuth) {
    if (!AuthService.isTokenValid()) {
      event.preventDefault();
      $state.go('login');
    }
  }
});
```

---

## STEP 5: FIX CONFIG.XML

### File: `config.xml`

**Manual Steps:**

1. **Update SDK version (line 20):**
```xml
<preference name="android-targetSdkVersion" value="33" />
```

2. **Enforce HTTPS (lines 8-11):**
```xml
<!-- Replace HTTP with HTTPS -->
<allow-navigation href="https://ionic.local/*" />
<allow-intent href="https://*/*" />
<allow-intent href="mailto:*" />
<allow-intent href="tel:*" />
```

3. **Disable cleartext traffic (line 29):**
```xml
<edit-config file="AndroidManifest.xml" mode="merge" target="/manifest/application">
    <application android:usesCleartextTraffic="false" />
</edit-config>
```

4. **Remove duplicate icons/splashes (lines 56-245):**
   - Keep only ONE set of icon/splash definitions
   - Delete all duplicates
   - Typical structure:
   ```xml
   <platform name="android">
       <icon density="ldpi" src="resources/android/icon/drawable-ldpi-icon.png" />
       <icon density="mdpi" src="resources/android/icon/drawable-mdpi-icon.png" />
       <!-- ... -->
   </platform>
   ```

5. **Remove duplicate plugin (line 268):**
   - Search for `cordova-plugin-geolocation`
   - Keep first occurrence, delete second

---

## STEP 6: UPDATE DEPENDENCIES

### File: `package.json`

**Critical Updates:**

```bash
# Remove deprecated packages
npm uninstall bower gulp-util cordova-plugin-console cordova-plugin-compat

# Update core dependencies
npm install gulp@5.0.0 --save-dev
npm install cordova@12.0.0 --save-dev
npm install cordova-android@13.0.0 --save
npm install cordova-ios@7.0.0 --save

# Replace deprecated packages
npm uninstall node-sass
npm install sass@1.70.0 --save-dev

npm install shelljs@0.8.5 --save-dev
```

**Update Cordova Plugins:**

```bash
# Update all plugins to latest versions
cordova plugin remove cordova-plugin-geolocation
cordova plugin add cordova-plugin-geolocation@latest

# Add secure storage
cordova plugin add cordova-plugin-secure-storage-echo
```

---

## STEP 7: MIGRATE TO SECURE STORAGE

### Install Plugin
```bash
cordova plugin add cordova-plugin-secure-storage-echo
```

### Create Secure Storage Service

**File:** Create `www/js/services/secureStorage.js`

```javascript
angular.module('starter.services')
.factory('SecureStorageService', function($q) {
  
  var storage = null;
  var initialized = false;
  
  var service = {
    init: function() {
      var deferred = $q.defer();
      
      if (initialized) {
        deferred.resolve(storage);
        return deferred.promise;
      }
      
      storage = new cordova.plugins.SecureStorage(
        function() {
          initialized = true;
          deferred.resolve(storage);
        },
        function(error) {
          console.error('SecureStorage init error:', error);
          deferred.reject(error);
        },
        'dscl_mobile_secure'
      );
      
      return deferred.promise;
    },
    
    set: function(key, value) {
      var deferred = $q.defer();
      
      service.init().then(function(storage) {
        storage.set(
          function() { deferred.resolve(); },
          function(error) { deferred.reject(error); },
          key, value
        );
      });
      
      return deferred.promise;
    },
    
    get: function(key) {
      var deferred = $q.defer();
      
      service.init().then(function(storage) {
        storage.get(
          function(value) { deferred.resolve(value); },
          function(error) { deferred.reject(error); },
          key
        );
      });
      
      return deferred.promise;
    },
    
    remove: function(key) {
      var deferred = $q.defer();
      
      service.init().then(function(storage) {
        storage.remove(
          function() { deferred.resolve(); },
          function(error) { deferred.reject(error); },
          key
        );
      });
      
      return deferred.promise;
    }
  };
  
  return service;
});
```

### Update AuthService to Use Secure Storage

Replace `$localStorage` with `SecureStorageService`:

```javascript
// Before:
$localStorage.blockchainToken = response.data.tokens.blockchainToken;

// After:
SecureStorageService.set('blockchainToken', response.data.tokens.blockchainToken);
```

---

## STEP 8: CODE QUALITY FIXES

### File: `www/js/app.js`

**Fix 1: Duplicate variable assignment (line 245)**
```javascript
// Remove duplicate line:
// $rootScope.swmCall = false;  // DELETE THIS LINE
```

**Fix 2: makeFloat function logic error**
```javascript
// Before (incorrect):
if (sValue == '' || sValue == null) {
    return sValue;
}

// After (correct):
if (sValue === '' || sValue === null || sValue === undefined) {
    return 0;  // Return safe default
}
```

**Fix 3: Undefined function reference**
```javascript
// Before:
var sss = pad(num, 2);

// After:
var sss = $rootScope.pad(num, 2);
```

---

## STEP 9: TESTING

### Security Testing Checklist:

- [ ] No credentials in source code (grep for passwords)
- [ ] All API calls use HTTPS
- [ ] Authentication flow works end-to-end
- [ ] Token refresh works correctly
- [ ] Logout clears all sensitive data
- [ ] App rejects expired tokens
- [ ] Secure storage encrypts data on device
- [ ] No sensitive data in logs

### Functional Testing:

- [ ] Login flow works
- [ ] Blockchain queries work with new token system
- [ ] GIS integration works
- [ ] MDDA integration works
- [ ] SWM admin functions work
- [ ] App builds successfully for Android/iOS
- [ ] App passes Google Play security review

---

## STEP 10: DEPLOYMENT

### Pre-deployment Checklist:

1. [ ] All credentials revoked and regenerated
2. [ ] Backend authentication endpoints deployed
3. [ ] Mobile app updated with security fixes
4. [ ] config.xml cleaned up
5. [ ] Dependencies updated
6. [ ] Security testing passed
7. [ ] Code review completed
8. [ ] QA testing completed

### Build Commands:

```bash
# Clean build
cordova clean

# Build for Android
cordova build android --release

# Build for iOS
cordova build ios --release
```

### Version Bump:

Update `config.xml`:
```xml
<widget id="com.dscl.mobile" version="2.0.0">
```

Update `package.json`:
```json
{
  "version": "2.0.0"
}
```

---

## ROLLBACK PLAN

If issues occur during deployment:

1. **Immediate rollback:**
   ```bash
   git checkout <previous_stable_commit>
   cordova build android
   ```

2. **Re-enable old credentials temporarily:**
   - Keep old credentials active in parallel during transition
   - Monitor both old and new authentication systems
   - Deprecate old system after 100% migration

3. **Monitor error rates:**
   - Set up logging for authentication failures
   - Track API error rates
   - Monitor user complaints

---

## TIMELINE ESTIMATE

- **STEP 1 (Revoke credentials):** 1 day
- **STEP 2 (Fix restful.js):** 2 hours
- **STEP 3 (Backend endpoints):** 3-5 days (depends on backend team)
- **STEP 4 (Mobile auth):** 2 days
- **STEP 5 (config.xml):** 4 hours
- **STEP 6 (Dependencies):** 1 day (testing compatibility)
- **STEP 7 (Secure storage):** 2 days
- **STEP 8 (Code quality):** 4 hours
- **STEP 9 (Testing):** 3-5 days
- **STEP 10 (Deployment):** 1 day

**Total:** ~3-4 weeks (depends on backend team availability)

---

## SUPPORT

For implementation questions:
- Security: [security-team@example.com]
- Backend: [backend-team@example.com]
- Mobile: [mobile-team@example.com]
