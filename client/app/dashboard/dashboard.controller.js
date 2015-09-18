'use strict';

angular.module('booktradeApp')
  .controller('DashboardCtrl', function ($scope, $http, Auth) {
    $scope.bookList = [];
    $scope.ownBooks = [];
    $scope.allBooks = [];
    $scope.trades = [];
    $scope.bookTitle = '';
    $scope.userId = Auth.getCurrentUser()._id;
    $scope.searching = false;

    var queryURL = 'https://www.googleapis.com/books/v1/volumes?callback=JSON_CALLBACK&q=';

    $scope.queryBook = function(searchStr) {
      $http.jsonp(queryURL + searchStr).then(function(books) {
        console.log(books);
        $scope.bookList = books.data.items.map((book) => {
          $scope.searching = true;
          console.log('search?', $scope.searching);
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
      newBook.owner = $scope.userId;
      $http.post('/api/books', newBook).success((book) => {
        $scope.ownBooks.push(book);
        $scope.bookList[index].added = true;
      });
    };

    $scope.deleteBook = function(book) {
      $http.delete('/api/books/' + book._id).then((response) => {
        if (response.status === 204) {
          $scope.ownBooks = $scope.ownBooks.filter((item) => item._id !== book._id);
        }
      });
    };

    $scope.addTrade = function(book) {
      let newTrade = {
        bookId: book._id,
        ownerId: book.owner,
        fromId: $scope.userId,
        title: book.title
      };
      $http.post('/api/trades', newTrade)
        .success((trade) => {
          $scope.trades.push(trade);
        });
    };

    $scope.approveRequest = function(trade) {
      trade.isApproved = true;
      $http.put('/api/trades/' + trade._id);
    };

    $scope.cancelRequest = function(trade) {
      $http.delete('/api/trades/' + trade._id).then((response) => {
        if (response.status === 204) {
          $scope.trades = $scope.trades.filter((item) => item._id !== trade._id);
        }
      });
    };

    $scope.hidePanel = function() {
      $scope.searching = false;
    };
    
    $scope.fetchBooks = function() {
      if ($scope.allBooks.length > 0) {
        return;
      }
      $http.get('/api/books/')
        .success((books) => $scope.allBooks = books);
    };

    $http.get('/api/books/user/' + $scope.userId)
      .success((books) => $scope.ownBooks = books);

    $http.get('/api/trades/user/' + $scope.userId)
      .success((trades) => $scope.trades = trades);
  });
