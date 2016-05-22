(function() {
  'use strict';

  angular
  .module('app')
  .filter('mySeqFilter', function(){
    return function mySeqFilter(input, id){
      return input.filter(function (each){

        var include = false;
        if  (id === each.userId){
          // each is the individual pose,
          include = true;
        }
        return include;
      });
    };
  });

})();
