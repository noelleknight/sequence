(function() {
  'use strict';

  angular
  .module('app',['firebase', 'ui.router'])
  .config(appConfig);

  appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function appConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('login', {
      url: '/',
      templateUrl: 'login/login.template.html',
      controller: 'LoginController',
      controllerAs: 'login'
    })
    .state('createPose', {
      url: '/create-pose',
      templateUrl: 'poses/create-pose.template.html',
      controller: 'CreatePoseController',
      controllerAs: 'pose'
    })
    .state('poses', {
      url: '/poses',
      templateUrl: 'poses/list-all-poses.template.html',
      controller: 'ListPosesController',
      controllerAs: 'poses'
    })
    .state('createSequence', {
      url: '/create-sequence',
      templateUrl: 'sequences/create-sequence.template.html',
      controller: 'SequenceController',
      controllerAs: 'makeSeq'
    })
    // .state('Sequence', {
    //   url: '/sequence/:id',
    //   templateUrl: 'sequences/sequence.template.html',
    //   controller: 'SequenceController',
    //   controllerAs: 'mySeq'
    // })
    .state('mySequences', {
      url: '/my-sequences',
      templateUrl: 'sequences/my-sequences.template.html',
      controller: 'ShowSequenceController',
      controllerAs: 'mySeq'
    });


  }

})();
