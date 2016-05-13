(function() {
  'use strict';

  angular
  .module('app',['firebase', 'ui.router'])
  .config(appConfig);

  appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function appConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
      url: '/'
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
    });


  }

})();
;(function() {
    'use strict';

    angular
      .module('app')
      .controller('CreatePoseController', CreatePoseController);

    CreatePoseController.$inject = ['PoseService'];
    function CreatePoseController(PoseService) {
      console.log('in PoseController');
      console.log("This is the array", PoseService.poseList);


      var that = this;
      this.newPose = null;

      this.addPose = function addPose() {
        console.log('in createPose function');
        console.log(that.newPose);
        PoseService.createPose(that.newPose);
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
      return $firebaseArray(poses).$add(newPose);
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

//# sourceMappingURL=app.js.map