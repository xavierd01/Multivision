angular.module('app').controller('mvProfileCtrl', function($scope, mvAuth, mvIdentity, mvNotifier) {
    $scope.email = mvIdentity.currentUser.username;
    $scope.fname = mvIdentity.currentUser.firstName;
    $scope.lname = mvIdentity.currentUser.lastName;

    $scope.update = function() {
        let newUserData = {
            username: $scope.email,
            firstName: $scope.fname,
            lastName: $scope.lname
        };
        if ($scope.password && $scope.password.length > 0) {
            newUserData.password = $scope.password;
        }

        mvAuth.updateCurrentUser(newUserData).then(function() {
            mvNotifier.notify('User profile updated!');
        }, function(reason) {
            mvNotifier.error(reason);
        });
    }
});