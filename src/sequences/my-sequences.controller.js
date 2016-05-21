(function() {
  'use strict';

  angular
  .module('app')
  .controller('ShowSequenceController', ShowSequenceController);

  ShowSequenceController.$inject = ['LoginService', 'SequenceService'];

  function ShowSequenceController(LoginService, SequenceService){
    var that = this;
    this.mySequences = null;

    SequenceService.getSequencess()
      .then(function getSeq(sequences){
        console.log(sequences);
        that.mySequences = sequences;
      });



  }
  })();
