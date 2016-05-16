(function() {
  'use strict';

  angular
  .module('app')
  .filter('makeSeqFilter', function(){
    return function makeSeqFilter(input, difficulty){
      return input.filter(function (each){
        var include = true;
        if(difficulty < each.difficulty){
          // each is the individual pose,
          include = false;
        }
        return include;
      });


    };

  });




})();
