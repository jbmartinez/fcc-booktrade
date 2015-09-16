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
      },
      link: function (scope, element, attrs) {
        scope.hideAddBtn = attrs.onAdd ? false : true;
        scope.hideDeleteBtn = attrs.onDelete ? false : true;
        scope.hideRequestBtn = attrs.onRequest ? false : true;
      }
    };
  });