(function() {
  'use strict';

  var assert = chai.assert;

  suite('create pose service', function () {
    var PoseService;
    var $httpBackend;

    setup(module('app'));

    setup(inject(function (_PoseService_, _$httpBackend_) {

      PoseService = _PoseService_;

      $httpBackend = _$httpBackend_;

      $httpBackend
        .whenPOST('https://yogibuild.firebaseio.com/poses')
        .respond(
          {bodyFocus:"Total", difficulty:"3", name:"Corpse Pose", sanskrit:"Savasana", tag:"Cool-Down", type: "Restorative"},
          {bodyFocus:"Total", difficulty:"3", name:"Corpse Pose", sanskrit:"Savasana", tag:"Cool-Down", type: "Restorative"});

    }));

    test('sanity check', function (){
      assert.strictEqual(1,1,'identiy function');
    });

    // test('new pose works', function (){
    //   var tester = PoseService.createPose( ({bodyFocus:"Total", difficulty:"3", name:"Corpse Pose", sanskrit:"Savasana", tag:"Cool-Down", type: "Restorative"},
              // {bodyFocus:"Total", difficulty:"3", name:"Corpse Pose", sanskrit:"Savasana", tag:"Cool-Down", type: "Restorative"}) );

    //
    //   assert.ok(tester.then, 'test does return a promise');
    //
    //   tester
    //     .then(function (response) {
    //       assert.strictEqual(response.id, 12345, 'the data returning is correct');
    //       doneCallback();
    //     })
    //     .catch(function () {
    //       assert.ok(false, 'the data is returning an error and that is not ok');
    //       doneCallback();
    //     });
    //     $httpBackend.flush();
    // });

  });

})();
