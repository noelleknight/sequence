(function() {
  'use strict';

  angular
  .module('app')
  .factory('LoginService', LoginService);


  function LoginService () {

    var ref = new Firebase("https://yogibuild.firebaseio.com/");
    ref.createUser({
      email    : '',
      password : ''
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
      }
    });

// Make better error handling above!!!!



  }




}());
