'use strict';

describe('Directive: bookList', function () {

  // load the directive's module and view
  beforeEach(module('booktradeApp'));
  beforeEach(module('app/bookList/bookList.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<book-list></book-list>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the bookList directive');
  }));
});