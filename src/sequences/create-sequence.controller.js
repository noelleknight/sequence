(function() {
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
        $state.go('mySequences');

        // , {id:ref.key()});
      });
      // error handle for this fn
      // stateparams for view sequence page
    };

  }
})();
