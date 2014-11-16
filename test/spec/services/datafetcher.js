'use strict';

describe('Service: dataFetcher', function () {

  // load the service's module
  beforeEach(module('bayesThornApp'));

  // instantiate service
  var dataFetcher;
  beforeEach(inject(function (_dataFetcher_) {
    dataFetcher = _dataFetcher_;
  }));

  it('should do something', function () {
    expect(!!dataFetcher).toBe(true);
  });

});
