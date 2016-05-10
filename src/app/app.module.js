(function() {
    'use strict';

  angular
    .module('app',['firebase', 'ui.router'])
    .config(appConfig);

  appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function appConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');


  }

})();
