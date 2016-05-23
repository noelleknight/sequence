(function() {
  'use strict';

  angular
  .module('app',['firebase', 'ui.router'])
  .config(appConfig);

  appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function appConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('login', {
      url: '/',
      templateUrl: 'login/login.template.html',
      controller: 'LoginController',
      controllerAs: 'login'
    })
    .state('createPose', {
      url: '/create-pose',
      templateUrl: 'poses/create-pose.template.html',
      controller: 'CreatePoseController',
      controllerAs: 'pose'
    })
    .state('poses', {
      url: '/poses',
      templateUrl: 'poses/list-all-poses.template.html',
      controller: 'ListPosesController',
      controllerAs: 'poses'
    })
    .state('createSequence', {
      url: '/create-sequence',
      templateUrl: 'sequences/create-sequence.template.html',
      controller: 'SequenceController',
      controllerAs: 'makeSeq'
    })
    .state('sequence', {
      url: '/sequences/:id',
      templateUrl: 'sequences/view-sequence.template.html',
      controller: 'ViewSeqController',
      controllerAs: 'viewSeq'
    })
    .state('mySequences', {
      url: '/my-sequences',
      templateUrl: 'sequences/my-sequences.template.html',
      controller: 'ShowSequenceController',
      controllerAs: 'mySeq'
    });
  }

})();
;(function() {
  'use strict';

  angular
  .module('app')
  .filter('makeSeqFilter', function(){
    return function makeSeqFilter(input, difficulty, focus){
      return input.filter(function (each){
        var include = true;
        if  (difficulty > each.difficulty){
          // each is the individual pose,
          include = false;
        }
        if (focus && focus !== each.bodyFocus) {
          include = false;
        }
        return include;
      });
    };
  });

})();
;(function() {
  'use strict';

  angular
  .module('app')
  .filter('mySeqFilter', function(){
    return function mySeqFilter(input, id){
      return input.filter(function (each){

        var include = false;
        if  (id === each.userId){
          // each is the individual pose,
          include = true;
        }
        return include;
      });
    };
  });

})();
;(function() {
  'use strict';

  angular
  .module('app')
  .controller('LoginController', LoginController);

  LoginController.$inject = ['$state','LoginService'];

  function LoginController($state, LoginService) {
    console.log('in LoginController');

    this.newUser = null;
    this.loginUser = null;

    if (LoginService.getUserID()) {
      $state.go('createSequence');
    }

    this.addUser = function addUser() {
      console.log('in createUser function');
      console.log(this.newUser);
      LoginService.createUser(this.newUser);

    };

    this.loginUser = function loginUser() {
      LoginService.userLogin(this.loginUser)
      .then(function userLog(){
        console.log("in login promise");
          $state.go('createSequence');
      });


    };
    this.userlogOut = function userlogOut() {
      console.log("I am logging out");
      LoginService.logOut();
      $state.go('login');
    };

    this.isLoggedIn = function isLoggedIn() {
      return !!LoginService.getUserID();
    };

    this.userCreated = function userCreated() {
      return !!LoginService.getUserInfo();
    };

  }
})();
;(function() {
  'use strict';

  angular
  .module('app')
  .factory('LoginService', LoginService);


  function LoginService (){

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
      ref.unauth();
      localStorage.setItem('userInfo', '');
    }
    function getUserInfo (){
      return userInfo;
    }
  }

}());
;(function() {
  'use strict';

  angular
  .module('app')
  .controller('CreatePoseController', CreatePoseController);

  CreatePoseController.$inject = ['PoseService'];


  function CreatePoseController(PoseService) {
    console.log("This is the array", PoseService.poseList);

    this.newPose = null;

    this.addPose = function addPose() {
      console.log('in createPose function');
      console.log(this.newPose);
      // do I need to call createPose if data is empty string
      PoseService.createPose(this.newPose);
      // .then()
      // .catch(); add error handling to this function
    };
  }
})();
;(function() {
  'use strict';

  angular
  .module('app')
  .factory('PoseService', PoseService);

  PoseService.$inject =  ['$firebaseArray'];

  function PoseService ($firebaseArray) {
    var poses = new Firebase ('https://yogibuild.firebaseio.com/poses');
    var poseList = $firebaseArray(poses);

    return {
      createPose: createPose,
      poseList: poseList
    };

    function createPose(newPose) {
      if (typeof newPose === "object"){
        return $firebaseArray(poses).$add(newPose);
      } else {
        return null;
      }
    }
  }




}());
;(function() {
  'use strict';

  angular
  .module('app')
  .controller('ListPosesController', ListPosesController);

  ListPosesController.$inject = ['PoseService'];
  function ListPosesController(PoseService) {

    this.poseList = PoseService.poseList;


  }
})();
;(function() {
  'use strict';

  angular
  .module('app')
  .controller('SequenceController', SequenceController);

  SequenceController.$inject = ['$state','PoseService', 'LoginService', 'SequenceService'];
  function SequenceController($state, PoseService, LoginService, SequenceService) {
    this.difficultyLevel = "";
    this.bodyFocus = "";
    this.mySequence = {};
    this.showPoses = PoseService.poseList;
    this.name = null;

    this.addNewSeq = function addNewSeq(newList, input){
      this.mySequence.name = input;
      this.mySequence.sequence = newList;
      this.mySequence.userId = LoginService.getUserID();

      var p = SequenceService.createSequence(this.mySequence);
      p.then( function seqView (ref){
        $state.go('sequence' , {id:ref.key()});
      });
      // error handle for this fn
      // stateparams for view sequence page
    };

  }
})();
;(function() {
  'use strict';

  angular
  .module('app')
  .controller('ShowSequenceController', ShowSequenceController);

  ShowSequenceController.$inject = ['LoginService', 'SequenceService'];

  function ShowSequenceController(LoginService, SequenceService){
    var that = this;
    this.uId = LoginService.getUserID();
    this.mySequences = null;

    this.seqId = LoginService.getUserID;
    SequenceService.getUserSequences(this.uId)
      .then(function(snapshot) {
        that.mySequences = snapshot.val();
        // Object.keys(that.mySequences);
      });

  }
  })();
;(function() {
  'use strict';

  angular
  .module('app')
  .factory('SequenceService', SequenceService);

  SequenceService.$inject =  ['$firebaseArray', '$firebaseObject'];

  function SequenceService ($firebaseArray, $firebaseObject) {
      var sequences = new Firebase('https://yogibuild.firebaseio.com/sequences');

      return {
        createSequence: createSequence,
        getSequencess: getSequencess,
        getSeqObj: getSeqObj,
        getUserSequences: getUserSequences
      };

      function createSequence(newSequence) {
        if (typeof newSequence === "object"){
          return $firebaseArray(sequences).$add(newSequence);
        } else {
          return null;
        }
      }
      function getSequencess() {
        var allSequences = [];
        return $firebaseArray(sequences).$loaded()
          .then(function(seqs) {
            allSequences = seqs;
            return allSequences;
          });
      }

      function getSeqObj(seqId){
        var seqObj = new Firebase('https://yogibuild.firebaseio.com/sequences/' + seqId);
        return $firebaseObject(seqObj).$loaded()
          .then(function(obj) {
            console.log('$firebaseObject', obj);
            return obj;
          });
      }
      function getUserSequences(uId){
        console.log("we are in the get user sequences function", uId);
        return sequences
          .orderByChild("userId")
          .equalTo(uId)
          .once("value");
      }
  }
})();
;(function() {
  'use strict';

  angular
  .module('app')
  .controller('ViewSeqController', ViewSeqController);

  ViewSeqController.$inject = ['$stateParams','LoginService', 'SequenceService'];

  function ViewSeqController($stateParams, LoginService, SequenceService){
  var that = this;
  this.showSeq = null;
  //  this.errorMessage = '';

  SequenceService.getSeqObj($stateParams.id)
    .then(function(seqObj) {
      console.log(seqObj);
      that.showSeq = seqObj;
    })
    .catch(function(err) {
      console.log('catch error', err);
      // that.errorMessage = 'The server is not responding. Please try again shortly.';
    });

  }
  })();

//# sourceMappingURL=app.js.map