(function() {
  'use strict';

  angular
  .module('app')
  .controller('ListPosesController', ListPosesController);

  ListPosesController.$inject = ['PoseService'];
  function ListPosesController(PoseService) {

    this.poseList = PoseService.poseList;


  }
})();
