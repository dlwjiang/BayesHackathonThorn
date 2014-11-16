'use strict';

describe('Directive: mapTable', function () {

  // load the directive's module
  beforeEach(module('bayesThornApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<map-table></map-table>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the mapTable directive');
  }));
});
