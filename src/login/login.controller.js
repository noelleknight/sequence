(function() {
  'use strict';

  angular
  .module('app')
  .controller('LoginController', LoginController);

  LoginController.$inject = ['$state','LoginService'];

  function LoginController($state, LoginService) {
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
      $state.go('createSequence');

    };
    this.userlogOut = function userlogOut() {
      console.log("I am logging out");
      LoginService.logOut();

    };

    this.isLoggedIn = function isLoggedIn() {
      return !!LoginService.getUserID();
    };

    this.userCreated = function userCreated() {
      return !!LoginService.getUserInfo();
    };

  }
})();
