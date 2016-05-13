(function() {
  'use strict';

  angular
  .module('app')
  .factory('LoginService', LoginService);


  function LoginService (){

    var createLogin = new Firebase("https://yogibuild.firebaseio.com/");

    return {
      createUser: createUser
    };

    function createUser(user){

       console.log(user);

      createLogin.createUser({
        email    : user.email,
        password : user.password

      } , function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
        } else {
          console.log("Successfully created user account with uid:", userData);
        }
      });

    }

// Make better error handling above!!!!


  }




}());
