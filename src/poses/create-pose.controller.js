(function() {
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
        // do I need to call createPose if data is empty string
        PoseService.createPose(that.newPose);
          // .then()
          // .catch(); add error handling to this function
      };




    }
    })();
