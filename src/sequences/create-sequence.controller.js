(function() {
    'use strict';

    angular
      .module('app')
      .controller('SequencesController', SequencesController);

    SequencesController.$inject = ['PoseService'];
    function SequencesController(PoseService) {

      this.showPoses = PoseService.poseList;

      this.addNewSeq = function addNewSeq(newList){
        console.log(newList);

      };

    }
    })();
