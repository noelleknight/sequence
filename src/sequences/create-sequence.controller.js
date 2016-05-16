(function() {
  'use strict';

  angular
  .module('app')
  .controller('SequencesController', SequencesController);

  SequencesController.$inject = ['PoseService'];
  function SequencesController(PoseService) {
    this.difficultyLevel = "";
    this.bodyFocus = "";

    this.showPoses = PoseService.poseList;

    this.addNewSeq = function addNewSeq(newList){
      console.log(newList);

    };

    this.tester = function tester() {
      console.log(this.difficultyLevel);
    };

  }
})();
