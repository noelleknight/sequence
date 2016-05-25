(function() {
  'use strict';

  angular
  .module('app')
  .filter('makeSeqFilter', function(){
    return function makeSeqFilter(input, difficulty, focus){
      return input.filter(function (each){
        var include = true;
        if  (difficulty < each.difficulty){
          // each is the individual pose,
          include = false;
        }
        if (focus && focus !== each.bodyFocus) {
          include = false;
        }
        return include;
      });
    };
  });

})();
