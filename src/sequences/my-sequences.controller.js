(function() {
  'use strict';

  angular
  .module('app')
  .controller('ShowSequenceController', ShowSequenceController);

  ShowSequenceController.$inject = ['LoginService', 'SequenceService'];

  function ShowSequenceController(LoginService, SequenceService){
    var that = this;
    this.mySequences = null;
    // this.userSequences = []; this will become array of sequences that match userId
    this.seqId = LoginService.getUserID;

    SequenceService.getSequencess()
      .then(function getSeq(sequences){
        console.log(sequences);
        that.mySequences = sequences;

      });

    


  }
  })();
