(function() {
  'use strict';

  angular
  .module('app')
  .controller('SequenceController', SequenceController);

  SequenceController.$inject = ['$state','PoseService', 'LoginService', 'SequenceService'];
  function SequenceController($state, PoseService, LoginService, SequenceService) {
    this.difficultyLevel = "4";
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
    };

  }
})();
