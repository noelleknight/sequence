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
          {"bodyFocus":"w","difficulty":"w","name":"foobar","sanskrit":"ew","tag":"f","type":"w"}
        );
          // {bodyFocus:"Total", difficulty:"3", name:"Corpse Pose", sanskrit:"Savasana", tag:"Cool-Down", type: "Restorative"});

    }));

    test('sanity check', function (){
      assert.strictEqual(1,1,'identiy function');
    });

    test('create pose works', function (){
      var p = PoseService.createPose({
        name:'lunge', type: 'active'
      });

      assert.ok(p, 'the function returns an object');
      assert.strictEqual(typeof p.then, 'function', 'the object returned is a promise');

      // we're not testing the return data since it's mocked out above
      // Instead, we just test for the existence of a promise
      // $httpBackend.flush();

    });

    test('create pose fails with no data', function() {
      var returnValue = PoseService.createPose();

      assert.strictEqual(returnValue, null,'With no data function returns null');


    });

    test('poseList returns poses array', function() {
      var poseArray = PoseService.poseList;
        assert.isArray(poseArray,'This is the pose array');

    });
        // $httpBackend.flush();
  });

  // });

})();
