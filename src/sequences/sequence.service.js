(function() {
  'use strict';

  angular
  .module('app')
  .factory('SequenceService', SequenceService);

  SequenceService.$inject =  ['$firebaseArray', '$firebaseObject'];

  function SequenceService ($firebaseArray, $firebaseObject) {
      var sequences = new Firebase('https://yogibuild.firebaseio.com/sequences');

      return {
        createSequence: createSequence,
        getSequencess: getSequencess,
        getSeqObj: getSeqObj,
        getUserSequences: getUserSequences
      };

      function createSequence(newSequence) {
        if (typeof newSequence === "object"){
          return $firebaseArray(sequences).$add(newSequence);
        } else {
          return null;
        }
      }
      function getSequencess() {
        var allSequences = [];
        return $firebaseArray(sequences).$loaded()
          .then(function(seqs) {
            allSequences = seqs;
            return allSequences;
          });
      }

      function getSeqObj(seqId){
        var seqObj = new Firebase('https://yogibuild.firebaseio.com/sequences/' + seqId);
        return $firebaseObject(seqObj).$loaded()
          .then(function(obj) {
            console.log('$firebaseObject', obj);
            return obj;
          });
      }
      function getUserSequences(uId){
        console.log("we are in the get user sequences function", uId);
        return sequences
          .orderByChild("userId")
          .equalTo(uId)
          .once("value");
      }
  }
})();
