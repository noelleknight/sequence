(function() {
  'use strict';

  angular
  .module('app')
  .factory('LoginService', LoginService);


  function LoginService (){

    var createLogin = new Firebase("https://yogibuild.firebaseio.com/");
    var login = new Firebase("https://yogibuild.firebaseio.com/");

    return {
      createUser: createUser,
      userLogin: userLogin
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
      // Make better error handling above!!!!
    }
  function userLogin(user){

    console.log(user);
    login.authWithPassword({
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
}

}());
