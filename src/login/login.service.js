(function() {
  'use strict';

  angular
  .module('app')
  .factory('LoginService', LoginService);


  function LoginService (){

    var ref = new Firebase("https://yogibuild.firebaseio.com/");
    var userID = null;
    var userInfo = null;

    return {
      getUserInfo : getUserInfo,
      createUser: createUser,
      userLogin: userLogin,
      logOut: logOut,
      getUserID: getUserID
    };

    function createUser(user){
      console.log(user);
      ref.createUser({
        email    : user.email,
        password : user.password,

      } , function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
        } else {
          console.log("Successfully created user account with uid:", userData);
          userInfo = userData;
        }
      });
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
          userID = authData.uid;
        }
      });

    }
    function getUserID (){
      return userID;
    }

    function logOut(){
      ref.unauth();
    }
    function getUserInfo (){
      return userInfo;
    }
  }

}());
