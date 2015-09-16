'use strict';

angular.module('booktradeApp')
  .directive('bookList', function () {
    return {
      templateUrl: 'app/bookList/bookList.html',
      // template: '<span>Works!!!</span>',
      restrict: 'E',
      scope: {
        list: '=',
        addBook: '&onAdd',
        deleteBook: '&onDelete'
      }
      // link: function (scope, element, attrs) {
      // }
    };
  });