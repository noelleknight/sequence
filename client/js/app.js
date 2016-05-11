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

  PoseService.$inject = ['$firebaseArray'];

  function PoseService ($firebaseArray) {

    var poses = new Firebase ('https://yogibuild.firebaseio.com/poses');

    return {createPose: createPose};


    function createPose(newPose) {
            $firebaseArray(poses).$add(newPose);
          }

  }



}());

//# sourceMappingURL=app.js.map