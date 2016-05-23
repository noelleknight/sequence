(function() {
  'use strict';

  angular
  .module('app')
  .controller('ShowSequenceController', ShowSequenceController);

  ShowSequenceController.$inject = ['LoginService', 'SequenceService'];

  function ShowSequenceController(LoginService, SequenceService){
    var that = this;
    this.uId = LoginService.getUserID();
    this.mySequences = null;

    this.seqId = LoginService.getUserID;
    SequenceService.getUserSequences(this.uId)
      .then(function(snapshot) {
        that.mySequences = snapshot.val();
        // Object.keys(that.mySequences);
      });

  }
  })();
