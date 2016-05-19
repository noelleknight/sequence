(function() {
  'use strict';

  angular
  .module('app')
  .controller('SequencesController', SequencesController);

  SequencesController.$inject = ['$state','PoseService', 'LoginService'];
  function SequencesController($state, PoseService, LoginService) {

    this.difficultyLevel = "";
    this.bodyFocus = "";
    this.mySequence = {};
    this.showPoses = PoseService.poseList;

    this.addNewSeq = function addNewSeq(newList){
      this.mySequence.sequence = newList;
      this.mySequence.id = LoginService.getUserID();
      $state.go('mySequences');
      console.log(this.mySequence.id, this.mySequence);
    };

  }
})();
