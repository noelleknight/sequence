(function() {
  'use strict';

  angular
  .module('app')
  .controller('ViewSeqController', ViewSeqController);

  ViewSeqController.$inject = ['$stateParams','LoginService', 'SequenceService'];

  function ViewSeqController($stateParams, LoginService, SequenceService){
  var that = this;
  this.showSeq = null;
  //  this.errorMessage = '';

  SequenceService.getSeqObj($stateParams.id)
    .then(function(seqObj) {
      console.log(seqObj);
      that.showSeq = seqObj;
    })
    .catch(function(err) {
      console.log('catch error', err);
      // that.errorMessage = 'The server is not responding. Please try again shortly.';
    });

  }
  })();
