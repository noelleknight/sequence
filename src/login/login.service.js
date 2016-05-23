(function() {
  'use strict';

  angular
  .module('app')
  .factory('LoginService', LoginService);

  LoginService.$inject = ['$firebaseAuth'];
  function LoginService ($firebaseAuth){

    var ref = new Firebase("https://yogibuild.firebaseio.com/");
    var userID = null;
    var userInfo = null;
    var existingData = {};

    try { existingData = JSON.parse(localStorage.getItem('userInfo')) || {}; } catch(e) { /* don't care */ }
    if (existingData.email && existingData.userID) {
      userID = existingData.userID;
    }

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

      return ref.authWithPassword({
        email    : user.email,
        password : user.password
        }).then( function(authData) {
          console.log("Authenticated successfully with payload:", authData);
          userID = authData.uid;
          localStorage.setItem('userInfo', JSON.stringify({ userID: userID, email: user.email }));
      });

    }
    function getUserID (){
      return userID;
    }

    function logOut(){
      console.log("hello");
      var authObj = $firebaseAuth(ref);
      authObj.$unauth();
      localStorage.setItem('userInfo', '');
    }
    function getUserInfo (){
      return userInfo;
    }
  }

}());
