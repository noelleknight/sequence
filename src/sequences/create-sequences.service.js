(function() {
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
