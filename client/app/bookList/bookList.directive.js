'use strict';

angular.module('booktradeApp')
  .directive('bookList', function () {
    return {
      templateUrl: 'app/bookList/bookList.html',
      restrict: 'E',
      scope: {
        list: '=',
        addBook: '&onAdd',
        deleteBook: '&onDelete',
        addTrade: '&onTrade'
      },
      link: function (scope, element, attrs) {
        scope.hideAddBtn = attrs.onAdd ? false : true;
        scope.hideDeleteBtn = attrs.onDelete ? false : true;
        scope.hideTradeBtn = attrs.onTrade ? false : true;
      }
    };
  });