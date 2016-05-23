(function() {
  'use strict';

  angular
  .module('app')
  .controller('ShowSequenceController', ShowSequenceController);

  ShowSequenceController.$inject = ['LoginService', 'SequenceService'];

  function ShowSequenceController(LoginService, SequenceService){
    // var that = this;
    this.uId = LoginService.getUserID();
    this.mySequences = null;
    // var that = this;
    this.seqId = LoginService.getUserID;
    this.mySequences = SequenceService.getUserSequences(this.uId).sequence;
    this.mySequenceName = SequenceService.getUserSequences(this.uId).name;
    //
    // SequenceService.getUserSequences(this.uId)
    //   .then(function getSeq(sequences){
    //     console.log(sequences);
    //     that.mySequences = sequences;

      // });

      // });




  }
  })();
