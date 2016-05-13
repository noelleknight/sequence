(function() {
    'use strict';

    angular
      .module('app')
      .controller('LoginController', LoginController);

  LoginController.$inject = ['LoginService'];
    function LoginService() {
      console.log('in LoginController');







    }
    })();
