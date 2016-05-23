(function() {
  'use strict';

  angular
  .module('app')
  .controller('ShowSequenceController', ShowSequenceController);

  ShowSequenceController.$inject = ['$scope', 'LoginService', 'SequenceService'];

  function ShowSequenceController($scope, LoginService, SequenceService){
    var that = this;
    this.uId = LoginService.getUserID();
    this.mySequences = [];

    this.seqId = LoginService.getUserID;

    SequenceService.getUserSequences(this.uId)
      .then(function(snapshot) {
        var sequences = [];
        snapshot.forEach(function(item) {
          sequences.push(item.val());
        });
        $scope.$apply(function() {
          that.mySequences = sequences;
        });
        console.log(that.mySequences);
      });

  }
  })();
