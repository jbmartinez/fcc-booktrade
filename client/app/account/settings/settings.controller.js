'use strict';

angular.module('booktradeApp')
  .controller('SettingsCtrl', function ($scope, $http, User, Auth) {
    $scope.errors = {};

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
    };

    $scope.changeProfile = function() {
      $http.put('/api/users/' + Auth.getCurrentUser()._id, $scope.user)
        .then( function() {
          $scope.profileMessage = 'Profile successfully updated.';
        });
    };
  });
