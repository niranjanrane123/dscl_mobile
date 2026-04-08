angular.module('starter')
  .factory('RequestInterceptor', [
    'AuthDataService'
    (AuthDataService) ->
      interceptor =
        request: (config) ->
          header = AuthDataService.getAuthData()
          if header then config.headers['Authorization'] = "Basic #{header}"
          config
      interceptor
])
