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
;(function() {
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
    // var that = this;
    this.uId = LoginService.getUserID();
    this.mySequences = null;
    // var that = this;
    this.seqId = LoginService.getUserID;
    this.mySequences = SequenceService.getUserSequences(this.uId).sequence;
    this.mySequenceName = SequenceService.getUserSequences(this.uId).name;
    //
    // SequenceService.getUserSequences(this.uId)
    //   .then(function getSeq(sequences){
    //     console.log(sequences);
    //     that.mySequences = sequences;

      // });

      // });




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
        console.log("we are in the get user sequences function" );
        sequences.orderByChild("userId").equalTo(uId).on("child_added", function(snapshot) {
          var userSeq = snapshot.val();
          console.log(userSeq);
          // userSeq = {
          //   name: 'Noelles sequence',
          //   sequence: [
          //     {
          //       bodyFocus: "Core",
          //       difficulty: 1,
          //       name: 'Boat'
          //     },
          //     {
          //       name: 'Chair'
          //     }
          //   ]
          // }
          return userSeq;

});

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