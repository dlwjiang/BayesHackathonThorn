'use strict';

describe('Controller: TotalmapcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('bayesThornApp'));

  var TotalmapcontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TotalmapcontrollerCtrl = $controller('TotalmapcontrollerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
