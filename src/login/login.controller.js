(function() {
    'use strict';

    angular
      .module('app')
      .controller('LoginController', LoginController);

  LoginController.$inject = ['LoginService'];

    function LoginController(LoginService) {
      console.log('in LoginController');

      this.newUser = null;
      this.loginUser = null;


      this.addUser = function addUser() {
        console.log('in createUser function');
        console.log(this.newUser);

        LoginService.createUser(this.newUser);

      };

      this.loginUser = function loginUser() {
        LoginService.userLogin(this.loginUser);
      };

    }
    })();
