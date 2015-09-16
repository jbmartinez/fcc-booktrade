'use strict';

angular.module('booktradeApp')
  .controller('DashboardCtrl', function ($scope, $http, Auth) {
    $scope.bookList = [];
    $scope.ownBooks = [];
    $scope.bookTitle = '';

    var queryURL = 'https://www.googleapis.com/books/v1/volumes?callback=JSON_CALLBACK&q=';

    $scope.queryBook = function(searchStr) {
      $http.jsonp(queryURL + searchStr).then(function(books) {
        console.log(books);
        $scope.bookList = books.data.items.map((book) => {
          let item = {title: book.volumeInfo.title};
          if ('imageLinks' in book.volumeInfo) {
            item.cover = book.volumeInfo.imageLinks.smallThumbnail;
          } else {
            item.cover = '';
          }
          return item;
        });
        $scope.bookTitle = '';
      });
    };

    $scope.addBook = function(index) {
      let newBook = $scope.bookList[index];
      newBook.owner = Auth.getCurrentUser()._id;
      $http.post('/api/books', newBook).success((book) => {
        $scope.ownBooks.push(book);
        $scope.bookList[index].added = true;
      });
    };

    $scope.deleteBook = function(book) {
      $http.delete('/api/books/' + book._id).then((response) => {
        console.log(response);
        if (response.status === 204) {
          console.log('deleted');
          $scope.ownBooks = $scope.ownBooks.filter((item) => item._id !== book._id);
        }
      });
    };

    $http.get('/api/books/user' + Auth.getCurrentUser()._id)
      .success((books) => $scope.ownBooks = books);
  });
