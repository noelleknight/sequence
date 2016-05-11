(function() {
  'use strict';

  angular
  .module('app')
  .factory('PoseService', PoseService);

  PoseService.$inject = ['$firebaseArray'];

  function PoseService ($firebaseArray) {

    var poses = new Firebase ('https://yogibuild.firebaseio.com/poses');
    var poseList = $firebaseArray(poses);


    return {
      createPose: createPose,
      poseList: poseList
    };

    function createPose(newPose) {
      $firebaseArray(poses).$add(newPose);
    }
  }




}());
