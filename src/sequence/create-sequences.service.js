(function() {
  'use strict';

  angular
  .module('app')
  .factory('SequenceService', SequenceService);

  SequenceService.$inject =  ['$firebaseArray'];

  function SequenceService ($firebaseArray) {
      var poses = new Firebase('https://yogibuild.firebaseio.com/sequences');





  }




}());
