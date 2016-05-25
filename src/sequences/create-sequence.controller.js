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
    this.name = null;
    // this.randomSort = function randomSort() {
    //   return Math.random();
    // };

    this.addNewSeq = function addNewSeq(newList, input){
      this.mySequence.name = input;
      this.mySequence.sequence = newList;
      // this.randomSort = function(newList) {
      // this.mySequence.sequence = newList;
      //   return Math.random();
      // };
      this.mySequence.userId = LoginService.getUserID();

      // this.randomSort = function randomSort(randomList){
      //     this.mySequence.sequence = randomList;
      //     return Math.random();
      // };

      var p = SequenceService.createSequence(this.mySequence);
      p.then( function seqView (ref){
        $state.go('sequence' , {id:ref.key()});
      });
    };

  }
})();
