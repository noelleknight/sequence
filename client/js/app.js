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
    .state('Sequence', {
      url: '/sequence/:id',
      templateUrl: 'sequences/sequence.template.html',
      controller: 'SequenceController',
      controllerAs: 'mySeq'
    })
    .state('mySequences', {
      url: '/my-sequences',
      templateUrl: 'sequences/my-sequences.template.html',
      controller: 'SequenceController',
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
      LoginService.logOut();

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

    return {
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

    this.addNewSeq = function addNewSeq(newList){
      this.mySequence.sequence = newList;
      this.mySequence.userId = LoginService.getUserID();
      var p = SequenceService.createSequence(this.mySequence);
      p.then( function seqView (ref){
        console.log(ref.key());
        $state.go('Sequence', {id:ref.key()});
      });
      // error handle for this fn
      // stateparams for view sequence page
    };

  }
})();
;;(function() {
  'use strict';

  angular
  .module('app')
  .factory('SequenceService', SequenceService);

  SequenceService.$inject =  ['$firebaseArray'];

  function SequenceService ($firebaseArray) {
      var sequences = new Firebase('https://yogibuild.firebaseio.com/sequences');
      var sequenceList = $firebaseArray(sequences);

      return {
        createSequence: createSequence,
        sequenceList: sequenceList
      };

      function createSequence(newSequence) {
        if (typeof newSequence === "object"){
          return $firebaseArray(sequences).$add(newSequence);
        } else {
          return null;
        }
      }
  }
}());

//# sourceMappingURL=app.js.map