(function() {
  'use strict';

  angular
  .module('app')
  .factory('LoginService', LoginService);


  function LoginService (){

    var ref = new Firebase("https://yogibuild.firebaseio.com/");

    return {
      createUser: createUser,
      userLogin: userLogin,
      logOut: logOut
    };

    function createUser(user){

      console.log(user);

      ref.createUser({
        email    : user.email,
        password : user.password

      } , function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
        } else {
          console.log("Successfully created user account with uid:", userData);
        }
      });
      // Make better error handling above!!!!
    }
    function userLogin(user){

      console.log(user);
      ref.authWithPassword({
        email    : user.email,
        password : user.password
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
        }
      });

    }
    function logOut(){
      ref.unauth();
    }
  }

}());
