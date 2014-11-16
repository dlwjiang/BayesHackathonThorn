'use strict';

describe('Controller: RingscontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('bayesThornApp'));

  var RingscontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RingscontrollerCtrl = $controller('RingscontrollerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
